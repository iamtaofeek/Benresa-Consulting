export type ContentProvenance = 'VERIFIED' | 'PROPOSED' | 'DEMO';

export type DemoPersonaId = 'client' | 'consultant' | 'operations';

export interface DemoPersona {
  id: DemoPersonaId;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  description: string;
  badge: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  provenance: ContentProvenance;
  deliverables: string[];
  keyBenefits: string[];
  engagementModels: string[];
  targetAudience: string;
  leadTimeWeeks: string;
  statHeadline?: string;
  statLabel?: string;
  verifiedSourceRoute?: string;
}

export type EngagementDeliveryMethod = 
  | 'advisory_project'
  | 'outsourced_managed'
  | 'talent_search'
  | 'compliance_audit'
  | 'retainer_support';

export interface ScopeDeliverable {
  id: string;
  title: string;
  category: string;
  included: boolean;
  estimatedDays: number;
  description: string;
  isCustom?: boolean;
}

export interface EngagementScope {
  serviceId: string;
  deliveryMethod: EngagementDeliveryMethod;
  orgSize: '1-25' | '26-100' | '101-500' | '500+';
  urgency: 'standard' | 'accelerated' | 'critical';
  locations: string[];
  priorities: string[];
  deliverables: ScopeDeliverable[];
  additionalNotes: string;
  estimatedDurationWeeks: number;
  complexityScore: number; // 1-100 calculated deterministically
}

export interface DocumentRequirement {
  id: string;
  name: string;
  category: string;
  required: boolean;
  description?: string;
  status: 'PENDING' | 'UPLOADED' | 'VALIDATED' | 'REJECTED';
  fileName?: string;
  fileSize?: number;
  uploadedAt?: string;
  validationNotes?: string;
}

export interface ReadinessCheck {
  id: string;
  title: string;
  status: 'PASS' | 'WARNING' | 'NEEDS_REVIEW';
  scoreImpact: number;
  detail: string;
  whyItMatters: string;
  recommendedAction: string;
}

export interface ProposalComment {
  id: string;
  sectionId: string;
  author: string;
  role: 'Client' | 'Benresa Consultant' | 'Legal/Compliance';
  timestamp: string;
  content: string;
  resolved: boolean;
}

export interface ProposalVersion {
  versionNumber: number;
  versionLabel: string;
  createdAt: string;
  createdBy: string;
  summaryOfChanges: string;
  status: 'DRAFT' | 'IN_REVIEW' | 'REVISION_REQUESTED' | 'APPROVED';
  scopeSnapshot: EngagementScope;
  approvalDetails?: {
    approvedBy: string;
    approvedAt: string;
    referenceCode: string;
  };
}

export interface Milestone {
  id: string;
  title: string;
  phase: string;
  targetWeek: number;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  deliverables: string[];
  dueDate: string;
  owner: string;
}

export interface RiskSignal {
  id: string;
  severity: 'CRITICAL' | 'ELEVATED' | 'MONITOR';
  category: 'DOCUMENTATION' | 'TIMELINE' | 'APPROVAL' | 'COMPLIANCE';
  title: string;
  cause: string;
  impact: string;
  resolutionPath: string;
  remedyActionLabel: string;
  computedScore: number;
}

export interface Engagement {
  id: string;
  referenceCode: string;
  clientName: string;
  clientIndustry: string;
  serviceId: string;
  serviceTitle: string;
  status: 
    | 'INTAKE'
    | 'PROPOSAL_REVIEW'
    | 'REVISION_REQUESTED'
    | 'APPROVED'
    | 'ACTIVE'
    | 'DELIVERABLE_REVIEW'
    | 'COMPLETED';
  leadConsultant: string;
  createdAt: string;
  currentMilestone: string;
  progressPercent: number;
  scope: EngagementScope;
  proposals: ProposalVersion[];
  documents: DocumentRequirement[];
  milestones: Milestone[];
  risks: RiskSignal[];
  activities: {
    id: string;
    timestamp: string;
    actor: string;
    action: string;
    details: string;
  }[];
}

export interface QualityReviewItem {
  id: string;
  criterion: string;
  scopeRequirement: string;
  deliveredArtifactSnippet: string;
  status: 'PASS' | 'NEEDS_REVISION' | 'EXCEEDS';
  reviewerNotes: string;
  flaggedAiObservation?: string;
}
