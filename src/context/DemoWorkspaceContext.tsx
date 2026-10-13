'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Engagement, DemoPersonaId, EngagementScope, ProposalComment, QualityReviewItem, DocumentRequirement, Milestone } from '@/types';
import { INITIAL_DEMO_ENGAGEMENTS, QUALITY_REVIEW_BENCHMARK } from '@/data/mock-engagements';
import { DEMO_PERSONAS } from '@/data/benresa-verified';

interface ScopeHistoryItem {
  engagementId: string;
  scope: EngagementScope;
  timestamp: string;
}

interface DemoWorkspaceContextType {
  // Persona
  personaId: DemoPersonaId;
  setPersonaId: (id: DemoPersonaId) => void;
  currentPersona: typeof DEMO_PERSONAS[0];

  // Engagements
  engagements: Engagement[];
  activeEngagementId: string;
  setActiveEngagementId: (id: string) => void;
  activeEngagement: Engagement | undefined;

  // Mutations
  addEngagement: (engagement: Partial<Engagement>) => string;
  updateScope: (engagementId: string, updatedScope: EngagementScope) => void;
  undoScope: (engagementId: string) => void;
  redoScope: (engagementId: string) => void;
  canUndo: boolean;
  canRedo: boolean;

  // Proposal Workflow
  approveProposal: (engagementId: string, versionNumber: number, approvedBy: string) => void;
  requestRevision: (engagementId: string, versionNumber: number, notes: string) => void;
  addCommentToProposal: (engagementId: string, comment: Omit<ProposalComment, 'id' | 'timestamp'>) => void;

  // Documents & Intake
  addDocument: (engagementId: string, doc: Omit<DocumentRequirement, 'id' | 'status' | 'uploadedAt'>) => void;
  validateDocument: (engagementId: string, docId: string) => void;

  // Milestones & Risk
  toggleMilestone: (engagementId: string, milestoneId: string) => void;
  resolveRisk: (engagementId: string, riskId: string) => void;

  // Quality & Deliverables Review
  qualityReviewItems: QualityReviewItem[];
  updateQualityItemStatus: (id: string, status: QualityReviewItem['status'], notes?: string) => void;

  // Command Palette & Modals
  isCmdKOpen: boolean;
  setIsCmdKOpen: (open: boolean) => void;
  isShortcutsOpen: boolean;
  setIsShortcutsOpen: (open: boolean) => void;

  // Guided Tour
  isTourActive: boolean;
  tourStep: number;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  endTour: () => void;

  // Reset
  resetDemoWorkspace: () => void;
}

const DemoWorkspaceContext = createContext<DemoWorkspaceContextType | undefined>(undefined);

export function DemoWorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [personaId, setPersonaId] = useState<DemoPersonaId>('client');
  const [engagements, setEngagements] = useState<Engagement[]>(INITIAL_DEMO_ENGAGEMENTS);
  const [activeEngagementId, setActiveEngagementId] = useState<string>('eng-001');
  const [qualityReviewItems, setQualityReviewItems] = useState<QualityReviewItem[]>(QUALITY_REVIEW_BENCHMARK);

  // Undo / Redo for Scope
  const [undoStack, setUndoStack] = useState<ScopeHistoryItem[]>([]);
  const [redoStack, setRedoStack] = useState<ScopeHistoryItem[]>([]);

  // Modals & Tour
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Load from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem('benresa-demo-engagements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEngagements(parsed);
        }
      } catch {
        // ignore parse errors and fallback to initial
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('benresa-demo-engagements', JSON.stringify(engagements));
  }, [engagements]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdKOpen((prev) => !prev);
      }
      // ?: Help shortcuts (when not in an input/textarea)
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      }
      // Esc closes modals
      if (e.key === 'Escape') {
        if (isCmdKOpen) setIsCmdKOpen(false);
        if (isShortcutsOpen) setIsShortcutsOpen(false);
        if (isTourActive) setIsTourActive(false);
      }
      // Cmd/Ctrl + Z: Undo scope (if active and not typing in text field)
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) && undoStack.length > 0) {
          e.preventDefault();
          undoScope(activeEngagementId);
        }
      }
      // Cmd/Ctrl + Shift + Z or Ctrl + Y: Redo scope
      if (((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') || ((e.metaKey || e.ctrlKey) && e.key === 'y')) {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) && redoStack.length > 0) {
          e.preventDefault();
          redoScope(activeEngagementId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCmdKOpen, isShortcutsOpen, isTourActive, undoStack, redoStack, activeEngagementId]);

  const currentPersona = DEMO_PERSONAS.find((p) => p.id === personaId) || DEMO_PERSONAS[0];
  const activeEngagement = engagements.find((e) => e.id === activeEngagementId) || engagements[0];

  // Scope mutations with undo/redo
  const updateScope = useCallback((engagementId: string, updatedScope: EngagementScope) => {
    setEngagements((prev) =>
      prev.map((eng) => {
        if (eng.id === engagementId) {
          // Push current state to undo stack
          setUndoStack((u) => [...u, { engagementId, scope: eng.scope, timestamp: new Date().toISOString() }]);
          setRedoStack([]); // clear redo on new action
          return {
            ...eng,
            scope: updatedScope,
            activities: [
              {
                id: `act-${Date.now()}`,
                timestamp: new Date().toISOString(),
                actor: currentPersona.name,
                action: 'Updated Scope Configuration',
                details: `Modified scope items (complexity: ${updatedScope.complexityScore}/100)`,
              },
              ...eng.activities,
            ],
          };
        }
        return eng;
      })
    );
  }, [currentPersona.name]);

  const undoScope = useCallback((engagementId: string) => {
    setUndoStack((currentUndo) => {
      if (currentUndo.length === 0) return currentUndo;
      const last = currentUndo[currentUndo.length - 1];
      const newUndo = currentUndo.slice(0, -1);

      setEngagements((prev) =>
        prev.map((eng) => {
          if (eng.id === engagementId) {
            setRedoStack((r) => [...r, { engagementId, scope: eng.scope, timestamp: new Date().toISOString() }]);
            return { ...eng, scope: last.scope };
          }
          return eng;
        })
      );

      return newUndo;
    });
  }, []);

  const redoScope = useCallback((engagementId: string) => {
    setRedoStack((currentRedo) => {
      if (currentRedo.length === 0) return currentRedo;
      const next = currentRedo[currentRedo.length - 1];
      const newRedo = currentRedo.slice(0, -1);

      setEngagements((prev) =>
        prev.map((eng) => {
          if (eng.id === engagementId) {
            setUndoStack((u) => [...u, { engagementId, scope: eng.scope, timestamp: new Date().toISOString() }]);
            return { ...eng, scope: next.scope };
          }
          return eng;
        })
      );

      return newRedo;
    });
  }, []);

  // Proposal Approval
  const approveProposal = useCallback((engagementId: string, versionNumber: number, approvedBy: string) => {
    setEngagements((prev) =>
      prev.map((eng) => {
        if (eng.id === engagementId) {
          const updatedProposals = eng.proposals.map((p) => {
            if (p.versionNumber === versionNumber) {
              return {
                ...p,
                status: 'APPROVED' as const,
                approvalDetails: {
                  approvedBy,
                  approvedAt: new Date().toISOString(),
                  referenceCode: `APP-BEN-${Math.floor(1000 + Math.random() * 9000)}-${eng.clientName.substring(0, 4).toUpperCase()}`,
                },
              };
            }
            return p;
          });

          return {
            ...eng,
            status: 'ACTIVE',
            proposals: updatedProposals,
            activities: [
              {
                id: `act-${Date.now()}`,
                timestamp: new Date().toISOString(),
                actor: approvedBy,
                action: `Approved Proposal V${versionNumber}.0`,
                details: 'Formal demo approval recorded; engagement transition to ACTIVE execution.',
              },
              ...eng.activities,
            ],
          };
        }
        return eng;
      })
    );
  }, []);

  const requestRevision = useCallback((engagementId: string, versionNumber: number, notes: string) => {
    setEngagements((prev) =>
      prev.map((eng) => {
        if (eng.id === engagementId) {
          const updatedProposals = eng.proposals.map((p) => {
            if (p.versionNumber === versionNumber) {
              return { ...p, status: 'REVISION_REQUESTED' as const };
            }
            return p;
          });

          return {
            ...eng,
            status: 'REVISION_REQUESTED',
            proposals: updatedProposals,
            activities: [
              {
                id: `act-${Date.now()}`,
                timestamp: new Date().toISOString(),
                actor: currentPersona.name,
                action: `Requested Revision on V${versionNumber}.0`,
                details: notes,
              },
              ...eng.activities,
            ],
          };
        }
        return eng;
      })
    );
  }, [currentPersona.name]);

  const addCommentToProposal = useCallback((engagementId: string, comment: Omit<ProposalComment, 'id' | 'timestamp'>) => {
    // In our simplified model, comments attach into activity log or proposal
    setEngagements((prev) =>
      prev.map((eng) => {
        if (eng.id === engagementId) {
          return {
            ...eng,
            activities: [
              {
                id: `act-${Date.now()}`,
                timestamp: new Date().toISOString(),
                actor: comment.author,
                action: `Added Comment on Proposal Section [${comment.sectionId}]`,
                details: `"${comment.content}"`,
              },
              ...eng.activities,
            ],
          };
        }
        return eng;
      })
    );
  }, []);

  const addDocument = useCallback((engagementId: string, doc: Omit<DocumentRequirement, 'id' | 'status' | 'uploadedAt'>) => {
    setEngagements((prev) =>
      prev.map((eng) => {
        if (eng.id === engagementId) {
          const newDoc: DocumentRequirement = {
            ...doc,
            id: `doc-${Date.now()}`,
            status: 'VALIDATED',
            uploadedAt: new Date().toISOString(),
            validationNotes: 'Preflight verified: valid structure, no malware detected.',
          };
          return {
            ...eng,
            documents: [...eng.documents, newDoc],
            activities: [
              {
                id: `act-${Date.now()}`,
                timestamp: new Date().toISOString(),
                actor: currentPersona.name,
                action: `Uploaded ${doc.name}`,
                details: `Validated format: ${doc.fileName || 'file'} (${Math.round((doc.fileSize || 0) / 1024)} KB)`,
              },
              ...eng.activities,
            ],
          };
        }
        return eng;
      })
    );
  }, [currentPersona.name]);

  const validateDocument = useCallback((engagementId: string, docId: string) => {
    setEngagements((prev) =>
      prev.map((eng) => {
        if (eng.id === engagementId) {
          return {
            ...eng,
            documents: eng.documents.map((d) =>
              d.id === docId ? { ...d, status: 'VALIDATED' as const, validationNotes: 'Verified by compliance officer' } : d
            ),
          };
        }
        return eng;
      })
    );
  }, []);

  const toggleMilestone = useCallback((engagementId: string, milestoneId: string) => {
    setEngagements((prev) =>
      prev.map((eng) => {
        if (eng.id === engagementId) {
          const updated = eng.milestones.map((m) => {
            if (m.id === milestoneId) {
              const nextStatus = m.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
              return { ...m, status: nextStatus as Milestone['status'] };
            }
            return m;
          });
          const completedCount = updated.filter((m) => m.status === 'COMPLETED').length;
          const newProgress = Math.round((completedCount / updated.length) * 100);

          return {
            ...eng,
            milestones: updated,
            progressPercent: newProgress,
            activities: [
              {
                id: `act-${Date.now()}`,
                timestamp: new Date().toISOString(),
                actor: currentPersona.name,
                action: 'Toggled Milestone State',
                details: `Updated milestone ${milestoneId}; total progress is now ${newProgress}%.`,
              },
              ...eng.activities,
            ],
          };
        }
        return eng;
      })
    );
  }, [currentPersona.name]);

  const resolveRisk = useCallback((engagementId: string, riskId: string) => {
    setEngagements((prev) =>
      prev.map((eng) => {
        if (eng.id === engagementId) {
          return {
            ...eng,
            risks: eng.risks.filter((r) => r.id !== riskId),
            activities: [
              {
                id: `act-${Date.now()}`,
                timestamp: new Date().toISOString(),
                actor: currentPersona.name,
                action: 'Resolved Operational Risk',
                details: `Remedy protocol deployed; risk flag ${riskId} cleared from dashboard.`,
              },
              ...eng.activities,
            ],
          };
        }
        return eng;
      })
    );
  }, [currentPersona.name]);

  const updateQualityItemStatus = useCallback((id: string, status: QualityReviewItem['status'], notes?: string) => {
    setQualityReviewItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, reviewerNotes: notes || item.reviewerNotes } : item
      )
    );
  }, []);

  const addEngagement = useCallback((newEngData: Partial<Engagement>) => {
    const newId = `eng-${Date.now()}`;
    const newRef = `DEMO-BEN-2026-00${engagements.length + 1}`;
    const newEngagement: Engagement = {
      id: newId,
      referenceCode: newRef,
      clientName: newEngData.clientName || 'Demo Organization Plc',
      clientIndustry: newEngData.clientIndustry || 'Commercial Enterprise',
      serviceId: newEngData.serviceId || 'hr-consulting',
      serviceTitle: newEngData.serviceTitle || 'HR Consulting Advisory',
      status: 'INTAKE',
      leadConsultant: 'Mr Taofeek Ambaliyu (COO)',
      createdAt: new Date().toISOString(),
      currentMilestone: 'Phase 1: Initial Scope & Statutory Intake Review',
      progressPercent: 15,
      scope: newEngData.scope || {
        serviceId: newEngData.serviceId || 'hr-consulting',
        deliveryMethod: 'advisory_project',
        orgSize: '26-100',
        urgency: 'standard',
        locations: ['Lagos (HQ)'],
        priorities: ['Statutory Compliance Review'],
        deliverables: [],
        additionalNotes: '',
        estimatedDurationWeeks: 4,
        complexityScore: 50,
      },
      proposals: [
        {
          versionNumber: 1,
          versionLabel: 'V1.0 Initial Draft',
          createdAt: new Date().toISOString(),
          createdBy: 'Benresa Advisory Desk',
          summaryOfChanges: 'Generated automatically from Client Onboarding Wizard.',
          status: 'IN_REVIEW',
          scopeSnapshot: newEngData.scope || ({} as any),
        },
      ],
      documents: newEngData.documents || [],
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: 'Project Kickoff & Requirements Verification',
          phase: 'Phase 1',
          targetWeek: 1,
          status: 'IN_PROGRESS',
          deliverables: ['Kickoff Summary'],
          dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
          owner: 'Benresa Advisory Desk',
        },
        {
          id: `m-${Date.now()}-2`,
          title: 'Draft Deliverable Delivery & Review',
          phase: 'Phase 2',
          targetWeek: 3,
          status: 'UPCOMING',
          deliverables: ['Draft Report'],
          dueDate: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
          owner: 'Client & Benresa Team',
        },
      ],
      risks: [],
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: 'Client Onboarding System',
          action: 'Created Engagement Intake',
          details: `Reference ${newRef} generated from consultation intake.`,
        },
      ],
    };

    setEngagements((prev) => [newEngagement, ...prev]);
    setActiveEngagementId(newId);
    return newId;
  }, [engagements.length]);

  const resetDemoWorkspace = useCallback(() => {
    setEngagements(INITIAL_DEMO_ENGAGEMENTS);
    setActiveEngagementId('eng-001');
    setQualityReviewItems(QUALITY_REVIEW_BENCHMARK);
    setUndoStack([]);
    setRedoStack([]);
    localStorage.removeItem('benresa-demo-engagements');
  }, []);

  // Tour controls
  const startTour = useCallback(() => {
    setIsTourActive(true);
    setTourStep(0);
  }, []);

  const nextTourStep = useCallback(() => {
    setTourStep((s) => Math.min(s + 1, 5));
  }, []);

  const prevTourStep = useCallback(() => {
    setTourStep((s) => Math.max(s - 1, 0));
  }, []);

  const endTour = useCallback(() => {
    setIsTourActive(false);
  }, []);

  return (
    <DemoWorkspaceContext.Provider
      value={{
        personaId,
        setPersonaId,
        currentPersona,
        engagements,
        activeEngagementId,
        setActiveEngagementId,
        activeEngagement,
        addEngagement,
        updateScope,
        undoScope,
        redoScope,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0,
        approveProposal,
        requestRevision,
        addCommentToProposal,
        addDocument,
        validateDocument,
        toggleMilestone,
        resolveRisk,
        qualityReviewItems,
        updateQualityItemStatus,
        isCmdKOpen,
        setIsCmdKOpen,
        isShortcutsOpen,
        setIsShortcutsOpen,
        isTourActive,
        tourStep,
        startTour,
        nextTourStep,
        prevTourStep,
        endTour,
        resetDemoWorkspace,
      }}
    >
      {children}
    </DemoWorkspaceContext.Provider>
  );
}

export function useDemoWorkspace() {
  const context = useContext(DemoWorkspaceContext);
  if (!context) {
    throw new Error('useDemoWorkspace must be used within a DemoWorkspaceProvider');
  }
  return context;
}
