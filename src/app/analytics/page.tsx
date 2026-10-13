'use client';

import React, { useState } from 'react';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  ShieldCheck, 
  Calendar, 
  Download, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function AnalyticsPage() {
  const { engagements } = useDemoWorkspace();
  const [timeRange, setTimeRange] = useState<string>('q3');

  // Deterministic analytics distributions
  const categoryMix = [
    { name: 'HR Consulting & Audit', percent: 34, color: 'bg-blue-600', text: 'text-blue-600' },
    { name: 'Talent Acquisition & Search', percent: 26, color: 'bg-cyan-500', text: 'text-cyan-500' },
    { name: 'Tax Management & TCC', percent: 22, color: 'bg-amber-500', text: 'text-amber-500' },
    { name: 'Compliance & Remittances', percent: 11, color: 'bg-emerald-500', text: 'text-emerald-500' },
    { name: 'Workforce Outsourcing', percent: 7, color: 'bg-purple-500', text: 'text-purple-500' },
  ];

  const milestoneThroughput = [
    { service: 'Executive Talent Search', rate: '96%', avgDays: '28 days', status: 'On Target' },
    { service: 'PAYE Structuring & TCC Filing', rate: '98%', avgDays: '35 days', status: 'Exceeds SLA' },
    { service: 'Labour Act HR Audit', rate: '94%', avgDays: '21 days', status: 'On Target' },
    { service: 'Statutory Pension Remittance', rate: '100%', avgDays: '14 days', status: 'Exceeds SLA' },
  ];

  const riskFactors = [
    { cause: 'Client Committee Scheduling (Panel bottleneck)', frequency: '42%' },
    { cause: 'Statutory Portal Latency (LIRS / FIRS server)', frequency: '31%' },
    { cause: 'Missing Background Check Authorizations', frequency: '27%' },
  ];

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-300 mb-1">
              OPERATIONAL INTELLIGENCE & ANALYTICS
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Consulting Portfolio Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Synthetic performance metrics derived deterministically from active portfolio records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Period:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1427] text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="q3">Q3 2026 (YTD)</option>
              <option value="q2">Q2 2026</option>
              <option value="all">Full Year 2026</option>
            </select>
          </div>
        </div>

        {/* 4 Stat Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Avg Time to Approved Scope
            </span>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              4.8 Days
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>32% faster with digital wizard</span>
            </div>
          </div>

          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Deliverable QC Parity
            </span>
            <div className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">
              100%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Zero statutory compliance defects
            </div>
          </div>

          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Client Retainer Renewal
            </span>
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              91.2%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Annual recurring engagement rate
            </div>
          </div>

          <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Resolved Risk Interventions
            </span>
            <div className="text-2xl font-bold font-mono text-amber-500 mt-1">
              14 / 14
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Average 24-hr remedy resolution
            </div>
          </div>
        </div>

        {/* 2 Main Visual Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Practice Category Distribution */}
          <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
              Engagement Category Distribution
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Percentage of corporate client mandates by consulting practice area.
            </p>

            <div className="space-y-4">
              {categoryMix.map((c, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span>{c.name}</span>
                    <span className="font-mono">{c.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Risk Root Cause Breakdown */}
          <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
              Delivery-Risk Root Cause Frequency
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Primary operational factors triggering SLA radar alerts across client engagements.
            </p>

            <div className="space-y-4">
              {riskFactors.map((r, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{r.cause}</span>
                  <span className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400">{r.frequency}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 text-xs text-slate-500">
              * Risk triggers auto-deploy mitigation procedures including remote interview briefs and direct zonal tax desk routing.
            </div>
          </div>
        </div>

        {/* Milestone SLA Throughput Table */}
        <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
            Service Practice Milestone Turnaround SLA
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Practice Discipline</th>
                  <th className="py-2.5 px-3">Milestone SLA Parity</th>
                  <th className="py-2.5 px-3">Average Turnaround</th>
                  <th className="py-2.5 px-3">Delivery Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {milestoneThroughput.map((m, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-white/5">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{m.service}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{m.rate}</td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">{m.avgDays}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
