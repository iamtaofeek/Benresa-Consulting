'use client';

import React, { useState } from 'react';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { exportProposalPDF } from '@/lib/pdf-export';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Download, 
  Upload, 
  Plus, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

export default function ClientDashboardPage() {
  const { 
    currentPersona, 
    engagements, 
    activeEngagement, 
    setActiveEngagementId, 
    toggleMilestone,
    addDocument
  } = useDemoWorkspace();

  const [uploadDocModalOpen, setUploadDocModalOpen] = useState(false);
  const [docNameInput, setDocNameInput] = useState('');
  const [docCategoryInput, setDocCategoryInput] = useState('Compliance');

  // Client's primary engagement
  const primaryEng = activeEngagement || engagements[0];

  const handleUploadNewDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNameInput.trim()) return;

    addDocument(primaryEng.id, {
      name: docNameInput.trim(),
      category: docCategoryInput,
      required: true,
      description: 'Uploaded via Client Workspace Document Center',
      fileName: `${docNameInput.trim().replace(/\s+/g, '_')}.pdf`,
      fileSize: 1250000,
    });

    setDocNameInput('');
    setUploadDocModalOpen(false);
  };

  const handleDownloadPDF = () => {
    const latestVersion = primaryEng.proposals[primaryEng.proposals.length - 1];
    exportProposalPDF(primaryEng, latestVersion);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Greeting & Persona Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-300">
                BENRESA CONNECT CLIENT WORKSPACE
              </span>
              <span className="text-xs text-slate-400">• Demo Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Welcome, {currentPersona.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {currentPersona.role} • <strong className="text-slate-800 dark:text-slate-200">{primaryEng.clientName}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Download Proposal PDF</span>
            </button>

            <a
              href="/start"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#102d73] hover:bg-[#0c2258] text-white shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Scope Intake</span>
            </a>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Engagements
            </span>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              {engagements.length}
            </div>
            <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium mt-1">
              Across HR, Tax & Talent
            </div>
          </div>

          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Overall Milestone SLA
            </span>
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              {primaryEng.progressPercent}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Tracked against agreed timeline
            </div>
          </div>

          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Validated Documents
            </span>
            <div className="text-2xl font-bold font-mono text-blue-600 dark:text-cyan-400 mt-1">
              {primaryEng.documents.filter(d => d.status === 'VALIDATED').length} / {primaryEng.documents.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Preflight compliance ready
            </div>
          </div>

          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Pending Actions
            </span>
            <div className="text-2xl font-bold font-mono text-amber-500 mt-1">
              {primaryEng.risks.length}
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
              Review items awaiting client input
            </div>
          </div>
        </div>

        {/* Engagements Switcher & Main Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Primary Engagement Operations (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Primary Engagement Showcase Card */}
            <div className="fintech-panel-elevated p-6 bg-white dark:bg-[#0c1427]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    <span>{primaryEng.referenceCode}</span>
                    <span>•</span>
                    <span>Lead: {primaryEng.leadConsultant}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {primaryEng.serviceTitle}
                  </h2>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Client Organization: <strong>{primaryEng.clientName}</strong> ({primaryEng.clientIndustry})
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono uppercase bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-cyan-300">
                    {primaryEng.status}
                  </span>
                  <div className="text-xs text-slate-500 mt-2 font-mono">
                    Progress: {primaryEng.progressPercent}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="py-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>Current Milestone: {primaryEng.currentMilestone}</span>
                  <span className="font-mono">{primaryEng.progressPercent}% Completed</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                    style={{ width: `${primaryEng.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Interactive Milestone Checkpoints */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span>Scheduled Milestones & Deliverables</span>
                  <span className="text-[10px] text-slate-400 lowercase">(click to toggle demo state)</span>
                </div>

                <div className="space-y-2">
                  {primaryEng.milestones.map((m) => {
                    const isDone = m.status === 'COMPLETED';
                    return (
                      <div
                        key={m.id}
                        onClick={() => toggleMilestone(primaryEng.id, m.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isDone
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isDone ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-600'}`}>
                            {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className={`text-xs font-semibold ${isDone ? 'line-through opacity-80' : 'text-slate-900 dark:text-white'}`}>
                              {m.title}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Phase: {m.phase} • Owner: {m.owner} • Due: {m.dueDate}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10">
                          {m.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                <a
                  href={`/engagements/${primaryEng.id}`}
                  className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Full Statement of Work & Revision History</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setUploadDocModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Document</span>
                </button>
              </div>
            </div>

            {/* Switch Active Engagement Selector Tabs */}
            <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Switch Client Engagement Perspective
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {engagements.map((eng) => (
                  <button
                    key={eng.id}
                    onClick={() => setActiveEngagementId(eng.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      eng.id === primaryEng.id
                        ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-600 dark:border-cyan-400'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                      {eng.referenceCode}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                      {eng.clientName}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {eng.serviceTitle}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Documents, Risks & Audit Activity (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Document Repository */}
            <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                  <span>Intake & Audit Records</span>
                </h3>
                <button
                  onClick={() => setUploadDocModalOpen(true)}
                  className="text-xs text-blue-600 dark:text-cyan-400 font-semibold hover:underline"
                >
                  + Upload
                </button>
              </div>

              <div className="space-y-2">
                {primaryEng.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs flex items-center justify-between"
                  >
                    <div className="truncate pr-2">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {doc.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {doc.fileName || 'document.pdf'}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Audit Log */}
            <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-600" />
                <span>Recent Audit Trail</span>
              </h3>

              <div className="space-y-3">
                {primaryEng.activities.slice(0, 4).map((act) => (
                  <div key={act.id} className="text-xs space-y-0.5 border-l-2 border-blue-500 pl-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {act.action}
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight">
                      {act.details}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {act.actor} • {new Date(act.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {uploadDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-md bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Upload Intake Document
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add supporting statutory or corporate files to {primaryEng.referenceCode}.
            </p>

            <form onSubmit={handleUploadNewDoc} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={docNameInput}
                  onChange={(e) => setDocNameInput(e.target.value)}
                  placeholder="e.g. 2025 Audited Financial Statement"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={docCategoryInput}
                  onChange={(e) => setDocCategoryInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Compliance">Compliance & Statutory</option>
                  <option value="Payroll">Payroll & Emoluments</option>
                  <option value="HR Policy">HR Policies & Handbook</option>
                  <option value="Executive Spec">Executive Role Specification</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadDocModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-[#102d73] hover:bg-[#0c2258] text-white"
                >
                  Confirm Upload (Demo)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
