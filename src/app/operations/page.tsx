'use client';

import React, { useState } from 'react';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Info
} from 'lucide-react';

export default function OperationsHubPage() {
  const { engagements, resolveRisk, setActiveEngagementId } = useDemoWorkspace();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRiskInspector, setSelectedRiskInspector] = useState<any | null>(null);

  // Collect all risks across engagements
  const allRisks = engagements.flatMap((eng) =>
    eng.risks.map((r) => ({ ...r, engagementId: eng.id, clientName: eng.clientName, ref: eng.referenceCode }))
  );

  const filteredEngagements = engagements.filter((eng) => {
    const matchStatus = filterStatus === 'all' || eng.status === filterStatus;
    const matchSearch = 
      eng.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eng.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eng.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 mb-1">
              INTERNAL CONSULTING OPERATIONS & SLA RADAR
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Consulting Operations Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Cross-engagement portfolio management, consultant assignments, and deterministic delivery-risk radar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-slate-500">
              Active Portfolio: {engagements.length} Cases
            </span>
          </div>
        </div>

        {/* 4 Operations KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Engagements
            </span>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              {engagements.length}
            </div>
            <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium mt-1">
              {engagements.filter(e => e.status === 'ACTIVE').length} Active Delivery Sprints
            </div>
          </div>

          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              At-Risk Flags
            </span>
            <div className="text-2xl font-bold font-mono text-amber-500 mt-1">
              {allRisks.length}
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
              {allRisks.filter(r => r.severity === 'ELEVATED' || r.severity === 'CRITICAL').length} Elevated Severity
            </div>
          </div>

          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Milestone Throughput
            </span>
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              96.4%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Average delivery SLA on-schedule
            </div>
          </div>

          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              QC Sign-Off Queue
            </span>
            <div className="text-2xl font-bold font-mono text-blue-600 dark:text-cyan-400 mt-1">
              {engagements.filter(e => e.status === 'DELIVERABLE_REVIEW').length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Awaiting partner quality audit
            </div>
          </div>
        </div>

        {/* Delivery-Risk & Operations Intelligence Radar (Section 20) */}
        <div className="fintech-panel-elevated p-6 bg-white dark:bg-[#0c1427]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Engagement Delivery-Risk Radar
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Deterministic alerts computed from synthetic state, document presence, and milestone deadlines.
              </p>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Deterministic Rules Engine Active
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {allRisks.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                ✓ All operational risks have been resolved. Portfolio running at 100% SLA health.
              </div>
            ) : (
              allRisks.map((risk) => (
                <div
                  key={risk.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        risk.severity === 'CRITICAL'
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          : risk.severity === 'ELEVATED'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {risk.severity}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">{risk.title}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono">{risk.ref} ({risk.clientName})</span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      <strong>Cause:</strong> {risk.cause} — <strong>Impact:</strong> {risk.impact}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedRiskInspector(risk)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 flex items-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Inspect Rule</span>
                    </button>

                    <button
                      onClick={() => resolveRisk(risk.engagementId, risk.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                    >
                      {risk.remedyActionLabel}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Portfolio Triage Table (Section 19) */}
        <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Active Client Engagement Portfolio
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time status transitions, lead consultant ownership, and milestone progress.
              </p>
            </div>

            {/* Filter and Search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter client or ref..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INTAKE">INTAKE</option>
                <option value="DELIVERABLE_REVIEW">DELIVERABLE_REVIEW</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Reference & Client</th>
                  <th className="py-3 px-3">Consulting Practice</th>
                  <th className="py-3 px-3">Lead Advisory Owner</th>
                  <th className="py-3 px-3">Current Milestone</th>
                  <th className="py-3 px-3">Progress</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredEngagements.map((eng) => (
                  <tr key={eng.id} className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-blue-600 dark:text-cyan-400">
                        {eng.referenceCode}
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                        {eng.clientName}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">
                      {eng.serviceTitle}
                    </td>

                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {eng.leadConsultant}
                    </td>

                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400 max-w-[200px] truncate">
                      {eng.currentMilestone}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 dark:bg-cyan-400"
                            style={{ width: `${eng.progressPercent}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-slate-500">{eng.progressPercent}%</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-cyan-300">
                        {eng.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <a
                        href={`/engagements/${eng.id}`}
                        onClick={() => setActiveEngagementId(eng.id)}
                        className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Manage</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Risk Rule Inspector Modal */}
      {selectedRiskInspector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-md bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Rule Calculation Inspector
              </span>
              <button
                onClick={() => setSelectedRiskInspector(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {selectedRiskInspector.title}
            </h3>
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3">
              Trigger Score: {selectedRiskInspector.computedScore}/100 • {selectedRiskInspector.category}
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div>
                <strong className="text-slate-800 dark:text-slate-200">Observed Trigger: </strong>
                {selectedRiskInspector.cause}
              </div>
              <div>
                <strong className="text-slate-800 dark:text-slate-200">Calculated Impact: </strong>
                {selectedRiskInspector.impact}
              </div>
              <div>
                <strong className="text-slate-800 dark:text-slate-200">Automated Resolution Path: </strong>
                {selectedRiskInspector.resolutionPath}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 dark:border-white/10 flex justify-end">
              <button
                onClick={() => {
                  resolveRisk(selectedRiskInspector.engagementId, selectedRiskInspector.id);
                  setSelectedRiskInspector(null);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
              >
                Deploy Remedy & Clear Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
