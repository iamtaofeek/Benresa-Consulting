'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { exportProposalPDF } from '@/lib/pdf-export';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  RotateCcw, 
  ChevronLeft, 
  MessageSquare, 
  ShieldCheck, 
  Plus, 
  Check, 
  AlertTriangle,
  History,
  Sparkles,
  Repeat
} from 'lucide-react';

export default function EngagementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const engagementId = params?.id as string;

  const { 
    engagements, 
    approveProposal, 
    requestRevision, 
    addCommentToProposal, 
    toggleMilestone, 
    addEngagement,
    currentPersona 
  } = useDemoWorkspace();

  const engagement = engagements.find((e) => e.id === engagementId) || engagements[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'proposal' | 'milestones' | 'documents' | 'activity' | 'renew'>('proposal');

  // Proposal comment input
  const [newCommentSection, setNewCommentSection] = useState<string>('Deliverables SLA');
  const [newCommentText, setNewCommentText] = useState<string>('');

  // Renewal form
  const [renewPeriod, setRenewPeriod] = useState<string>('Q4 2026 - Q1 2027');
  const [renewHeadcount, setRenewHeadcount] = useState<'1-25' | '26-100' | '101-500' | '500+'>(engagement.scope.orgSize);
  const [renewCreated, setRenewCreated] = useState<string>('');

  const activeProposal = engagement.proposals[engagement.proposals.length - 1];

  const handleApprove = () => {
    approveProposal(engagement.id, activeProposal.versionNumber, `${currentPersona.name} (${currentPersona.role})`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    addCommentToProposal(engagement.id, {
      sectionId: newCommentSection,
      author: currentPersona.name,
      role: 'Client',
      content: newCommentText.trim(),
      resolved: false,
    });

    setNewCommentText('');
  };

  const handleCreateRenewal = () => {
    const newRef = `DEMO-BEN-2027-00${engagements.length + 1}`;
    const newId = addEngagement({
      clientName: `${engagement.clientName} (Renewal)`,
      clientIndustry: engagement.clientIndustry,
      serviceId: engagement.serviceId,
      serviceTitle: `${engagement.serviceTitle} — Extended Period ${renewPeriod}`,
      scope: {
        ...engagement.scope,
        orgSize: renewHeadcount,
        additionalNotes: `Renewed engagement following approved baseline ${engagement.referenceCode}.`,
      },
    });

    setRenewCreated(newRef);
    setTimeout(() => {
      router.push(`/engagements/${newId}`);
    }, 1200);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Back */}
        <div className="flex items-center justify-between">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Client Workspace</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400">Demo State Persistent</span>
          </div>
        </div>

        {/* Master Engagement Header Card */}
        <div className="fintech-panel-elevated p-6 sm:p-8 bg-white dark:bg-[#0c1427]">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                <span className="font-bold">{engagement.referenceCode}</span>
                <span>•</span>
                <span>Created {new Date(engagement.createdAt).toLocaleDateString()}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {engagement.serviceTitle}
              </h1>
              <div className="text-xs text-slate-500 mt-1">
                Client: <strong>{engagement.clientName}</strong> ({engagement.clientIndustry}) • Lead Advisory: <strong>{engagement.leadConsultant}</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => exportProposalPDF(engagement, activeProposal)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>Download Proposal PDF</span>
              </button>

              {activeProposal.status !== 'APPROVED' ? (
                <button
                  onClick={handleApprove}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Proposal in Demo</span>
                </button>
              ) : (
                <span className="px-3.5 py-2 rounded-xl text-xs font-bold font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>APPROVED (LOCKED)</span>
                </span>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="pt-4 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
            {[
              { id: 'proposal', label: 'Proposal & Version History' },
              { id: 'overview', label: 'Scope Deliverables' },
              { id: 'milestones', label: 'Milestone Timeline' },
              { id: 'documents', label: 'Attached Records' },
              { id: 'activity', label: 'Audit Trail' },
              { id: 'renew', label: 'Repeat / Renew Flow' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === t.id
                    ? 'bg-[#102d73] dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: Proposal & Version History (Section 16 & 17) */}
        {activeTab === 'proposal' && (
          <div className="space-y-6">
            {/* Version History Git-Style Timeline */}
            <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10 mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-blue-600" />
                  <span>Statement of Work Revision Timeline ({engagement.proposals.length} Versions)</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">Immutable audit snapshots</span>
              </div>

              <div className="space-y-3">
                {engagement.proposals.map((prop) => (
                  <div
                    key={prop.versionNumber}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      prop.versionNumber === activeProposal.versionNumber
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 dark:border-cyan-400'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {prop.versionLabel}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          prop.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-200 text-slate-800 dark:bg-white/10 dark:text-slate-200'
                        }`}>
                          {prop.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {prop.summaryOfChanges}
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Authored by {prop.createdBy} on {new Date(prop.createdAt).toLocaleString()}
                      </div>
                    </div>

                    {prop.approvalDetails && (
                      <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-left sm:text-right shrink-0 text-xs">
                        <div className="font-bold text-emerald-800 dark:text-emerald-300">
                          ✓ Signed by {prop.approvalDetails.approvedBy}
                        </div>
                        <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                          Ref: {prop.approvalDetails.referenceCode}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Proposal Document Body & Section Annotations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Proposal View (8 cols) */}
              <div className="lg:col-span-8 fintech-panel p-6 sm:p-8 bg-white dark:bg-[#0c1427] space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-600 uppercase">
                    OFFICIAL PROPOSAL DRAFT
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                    Statement of Work & Consulting Agreement
                  </h3>
                  <div className="text-xs text-slate-500 mt-1">
                    Prepared by Benresa Consult Limited for <strong>{engagement.clientName}</strong>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/10 pt-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                      1. Executive Objective
                    </h4>
                    <p>
                      Benresa Consult Limited is appointed to deliver strategic advisory, statutory execution, and operational oversight for {engagement.serviceTitle}. All deliverables follow Nigeria statutory codes and Benresa quality benchmarks.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                      2. Deliverables & SLA Framework
                    </h4>
                    <div className="space-y-1.5 pl-2">
                      {engagement.scope.deliverables.map((del) => (
                        <div key={del.id} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                          <span><strong>{del.title}:</strong> {del.description} ({del.estimatedDays} days)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                      3. Governance & Quality Assurance
                    </h4>
                    <p>
                      70% of consultant hours are spent on co-owned execution. Deliverables undergo preflight verification at /quality before board delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section Annotations & Discussions (4 cols) */}
              <div className="lg:col-span-4 fintech-panel p-5 bg-white dark:bg-[#0c1427] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                    <span>Section Comments</span>
                  </h4>
                </div>

                <form onSubmit={handleAddComment} className="space-y-2">
                  <select
                    value={newCommentSection}
                    onChange={(e) => setNewCommentSection(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Deliverables SLA">Section: Deliverables SLA</option>
                    <option value="Executive Objective">Section: Executive Objective</option>
                    <option value="Governance & QA">Section: Governance & QA</option>
                  </select>

                  <textarea
                    rows={3}
                    required
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Attach an annotation or requested clarification..."
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Attach Comment
                  </button>
                </form>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-white/10">
                  All annotations are logged into the engagement audit trail.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Overview & Scope */}
        {activeTab === 'overview' && (
          <div className="fintech-panel p-6 sm:p-8 bg-white dark:bg-[#0c1427] space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Agreed Deliverables Breakdown ({engagement.scope.deliverables.length})
            </h3>
            <div className="space-y-3">
              {engagement.scope.deliverables.map((del) => (
                <div key={del.id} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{del.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{del.description}</p>
                    <span className="text-[10px] font-mono text-cyan-600 mt-1 block">Category: {del.category}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {del.estimatedDays} days
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Milestones */}
        {activeTab === 'milestones' && (
          <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427] space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Milestone Timelines & SLA
            </h3>
            <div className="space-y-2">
              {engagement.milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => toggleMilestone(engagement.id, m.id)}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between cursor-pointer hover:border-slate-300"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${m.status === 'COMPLETED' ? 'bg-emerald-500 text-white' : 'border border-slate-400'}`}>
                      {m.status === 'COMPLETED' && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">{m.title}</div>
                      <div className="text-[10px] text-slate-500">{m.phase} • Due: {m.dueDate} • Owner: {m.owner}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white dark:bg-white/10">
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Documents */}
        {activeTab === 'documents' && (
          <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427] space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Preflight Records & Statutory Uploads
            </h3>
            <div className="space-y-2">
              {engagement.documents.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">{doc.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{doc.fileName}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Activity Log */}
        {activeTab === 'activity' && (
          <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427] space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Complete Engagement Audit Log
            </h3>
            <div className="space-y-3">
              {engagement.activities.map((act) => (
                <div key={act.id} className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">{act.action}</div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">{act.details}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1">
                    Actor: {act.actor} • {new Date(act.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Repeat / Renew Flow (Section 24) */}
        {activeTab === 'renew' && (
          <div className="fintech-panel-elevated p-6 sm:p-8 bg-white dark:bg-[#0c1427] space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Repeat className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Repeat Service / Renew Engagement Baseline
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Reuse approved scope parameters from {engagement.referenceCode} to instantiate a subsequent recurring sprint without overwriting historical records.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subsequent Renewal Cycle *
                </label>
                <input
                  type="text"
                  value={renewPeriod}
                  onChange={(e) => setRenewPeriod(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Adjusted Headcount Size
                </label>
                <select
                  value={renewHeadcount}
                  onChange={(e) => setRenewHeadcount(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white"
                >
                  <option value="1-25">1-25 Employees</option>
                  <option value="26-100">26-100 Employees</option>
                  <option value="101-500">101-500 Employees</option>
                  <option value="500+">500+ Employees</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200">Reused Specifications:</strong>
              <div>• Retains {engagement.scope.deliverables.length} core deliverables</div>
              <div>• Retains {engagement.scope.locations.join(', ')} operational coverage</div>
              <div>• Generates new unique reference code in application state</div>
            </div>

            {renewCreated ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
                ✓ Renewal Registered with Reference: {renewCreated}. Redirecting...
              </div>
            ) : (
              <button
                type="button"
                onClick={handleCreateRenewal}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
              >
                <span>Instantiate Renewed Engagement</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
