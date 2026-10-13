'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Receipt, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Building2
} from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  tag: string;
  client: string;
  service: string;
  ref: string;
  readinessScore: number;
  currentTask: string;
  currentPhase: string;
  nextMilestone: string;
  daysRemaining: number;
  riskStatus: 'LOW' | 'ELEVATED' | 'STABLE';
  riskDetail: string;
  documents: { name: string; ready: boolean }[];
  milestones: { title: string; done: boolean }[];
  actionPrompt: string;
  actionCompletedText: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'talent',
    name: 'Executive Talent Search',
    tag: 'Talent Acquisition',
    client: 'Apex Logistics Plc',
    service: 'VP of Operations & Fleet Safety',
    ref: 'DEMO-BEN-2026-001',
    readinessScore: 88,
    currentTask: 'Reviewing 3 Finalist Panel Assessment Scores',
    currentPhase: 'Phase 3: Assessment & Vetting',
    nextMilestone: 'Board Compensation Panel & Verification Dossiers',
    daysRemaining: 4,
    riskStatus: 'STABLE',
    riskDetail: 'Background credential checks running on candidate 3.',
    documents: [
      { name: 'C-Suite Competency Blueprint', ready: true },
      { name: 'Executive Salary Band Benchmark', ready: true },
      { name: 'Confidentiality & NDA Agreement', ready: true },
      { name: 'Referee Background Authorizations', ready: false },
    ],
    milestones: [
      { title: 'Market Mapping (42 Candidates)', done: true },
      { title: 'Technical Screen (9 Executives)', done: true },
      { title: 'Final Panel Interviews (3 Finalists)', done: false },
      { title: 'Formal Offer Issuance', done: false },
    ],
    actionPrompt: 'Trigger Background Check SLA Verification',
    actionCompletedText: 'Background SLA Verified & Routed to Board Panel',
  },
  {
    id: 'tax',
    name: 'Payroll Tax & TCC',
    tag: 'Tax Management',
    client: 'Sterling Global Capital',
    service: 'PAYE Structuring & 4 Directors TCC',
    ref: 'DEMO-BEN-2026-002',
    readinessScore: 94,
    currentTask: 'LIRS Electronic Clearance Verification',
    currentPhase: 'Phase 4: Statutory TCC Issuance',
    nextMilestone: 'Final Tax Clearance Certificates Download',
    daysRemaining: 2,
    riskStatus: 'LOW',
    riskDetail: 'All 42 staff PAYE schedules reconciled with zero penalties.',
    documents: [
      { name: 'Audited Financial Statements', ready: true },
      { name: 'Monthly PAYE Bank Remittances', ready: true },
      { name: 'Directors Payer ID Profiles', ready: true },
      { name: 'Annual Form H1 Filing Dossier', ready: true },
    ],
    milestones: [
      { title: 'Payroll Tax Diagnostic', done: true },
      { title: 'Tax-Efficient Restructuring', done: true },
      { title: 'State Tax Authority Return', done: true },
      { title: 'Executive TCC Generation', done: false },
    ],
    actionPrompt: 'Generate Electronic TCC Verification Package',
    actionCompletedText: 'Official TCC Package Downloaded & Delivered',
  },
  {
    id: 'compliance',
    name: 'HR Compliance Audit',
    tag: 'HR Advisory',
    client: 'Helios Health Systems',
    service: '280 Clinical Contracts & Labour Act',
    ref: 'DEMO-BEN-2026-003',
    readinessScore: 92,
    currentTask: 'Deliverable Quality Review Sign-off',
    currentPhase: 'Sprint 4: Deliverable QC & Board Presentation',
    nextMilestone: 'Unified Employee Handbook Implementation',
    daysRemaining: 1,
    riskStatus: 'ELEVATED',
    riskDetail: 'Licensing inspection scheduled in 5 days; handbook review pending sign-off.',
    documents: [
      { name: '280 Clinical Staff Contract Logs', ready: true },
      { name: 'Overtime & Shift Differential Data', ready: true },
      { name: 'Statutory Pension Remittance Sheets', ready: true },
      { name: 'Unified Handbook Draft v2.0', ready: true },
    ],
    milestones: [
      { title: 'Labour Act Diagnostic Audit', done: true },
      { title: 'Overtime Harmonization', done: true },
      { title: 'Harmonized Staff Handbook', done: true },
      { title: 'Executive Board Approval', done: false },
    ],
    actionPrompt: 'Run Simulated Quality Assurance Verification',
    actionCompletedText: 'All 4 Quality Standards Verified (100% Pass)',
  },
];

export function InteractiveHeroPulse() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('talent');
  const [actionTriggered, setActionTriggered] = useState<boolean>(false);
  const [docStates, setDocStates] = useState<{ [key: string]: boolean }>({});

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleScenarioChange = (id: string) => {
    setActiveScenarioId(id);
    setActionTriggered(false);
  };

  const toggleDoc = (docName: string) => {
    setDocStates((prev) => ({
      ...prev,
      [`${scenario.id}-${docName}`]: !(prev[`${scenario.id}-${docName}`] ?? scenario.documents.find(d => d.name === docName)?.ready),
    }));
  };

  const isDocReady = (docName: string, defaultReady: boolean) => {
    const key = `${scenario.id}-${docName}`;
    return docStates[key] !== undefined ? docStates[key] : defaultReady;
  };

  return (
    <div className="w-full fintech-panel-elevated p-4 sm:p-6 lg:p-7 relative overflow-hidden technical-grid-bg">
      {/* Background Accent Gradient Glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controller: Scenario Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Consulting Operations Pulse</span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-normal lowercase">(live prototype)</span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select a live consulting scenario to see deterministic workflow tracking in action:
          </p>
        </div>

        {/* 3 Scenario Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl w-full sm:w-auto overflow-x-auto">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                s.id === scenario.id
                  ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Operations Canvas Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-5 relative z-10">
        {/* Left Column: Live Engagement Status & Current Sprint (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Header Card */}
          <div className="fintech-panel p-4 bg-white/80 dark:bg-[#0c1427]/80">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{scenario.client}</span>
                  <span>•</span>
                  <span>{scenario.ref}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {scenario.service}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Category: <span className="font-medium text-slate-700 dark:text-slate-300">{scenario.tag}</span>
                </div>
              </div>

              {/* Readiness Score Pill */}
              <div className="text-right shrink-0">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Readiness Score
                </div>
                <div className="text-xl font-bold font-mono text-blue-600 dark:text-cyan-400">
                  {actionTriggered ? 100 : scenario.readinessScore}/100
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {actionTriggered ? '✓ 100% Verified' : 'Deterministic Check'}
                </div>
              </div>
            </div>

            {/* Current Active Task Indicator */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-start gap-2.5">
              <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs flex-1">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Current Sprint: </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {actionTriggered ? scenario.actionCompletedText : scenario.currentTask}
                </span>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Phase: {scenario.currentPhase} • Due in {scenario.daysRemaining} business days
                </div>
              </div>
            </div>
          </div>

          {/* Milestone Progression Tracker */}
          <div className="fintech-panel p-4 bg-white/80 dark:bg-[#0c1427]/80">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-3">
              <span>Operational Milestones Progression</span>
              <span className="font-mono text-[11px] text-blue-600 dark:text-cyan-400">
                {actionTriggered ? '4 of 4 Completed' : '2 of 4 Completed'}
              </span>
            </div>

            <div className="space-y-2">
              {scenario.milestones.map((m, idx) => {
                const isCompleted = m.done || (actionTriggered && idx === 2);
                return (
                  <div 
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                      isCompleted 
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 border border-emerald-200/40 dark:border-emerald-800/30' 
                        : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isCompleted ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-600'}`}>
                        {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className={isCompleted ? 'font-medium' : ''}>{m.title}</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-70">
                      {isCompleted ? 'DONE' : 'SCHEDULED'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Preflight Documents, Risk, & Direct Action (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Document Preflight Checklist */}
          <div className="fintech-panel p-4 bg-white/80 dark:bg-[#0c1427]/80">
            <div className="flex items-center justify-between mb-2.5">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>Statutory Intake Documents</span>
              </div>
              <span className="text-[10px] text-slate-400">Click to toggle</span>
            </div>

            <div className="space-y-1.5">
              {scenario.documents.map((doc, idx) => {
                const ready = isDocReady(doc.name, doc.ready);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleDoc(doc.name)}
                    className="w-full flex items-center justify-between p-2 rounded-lg text-xs text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                  >
                    <span className="text-slate-700 dark:text-slate-300 truncate pr-2">
                      {doc.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold font-mono shrink-0 ${
                      ready 
                        ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200' 
                        : 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200'
                    }`}>
                      {ready ? 'VALIDATED' : 'PENDING'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Operational Risk Radar Card */}
          <div className="fintech-panel p-3.5 bg-white/80 dark:bg-[#0c1427]/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <AlertTriangle className={`w-3.5 h-3.5 ${scenario.riskStatus === 'ELEVATED' ? 'text-amber-500' : 'text-emerald-500'}`} />
                <span>Risk Radar</span>
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                scenario.riskStatus === 'ELEVATED'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {actionTriggered ? 'RESOLVED' : scenario.riskStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
              {actionTriggered ? 'Risk mitigated via automated protocol.' : scenario.riskDetail}
            </p>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={() => setActionTriggered(!actionTriggered)}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
              actionTriggered
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-gradient-to-r from-[#102d73] to-blue-800 hover:from-blue-900 hover:to-blue-950 text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{actionTriggered ? 'Reset Pulse Simulation' : scenario.actionPrompt}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Proof Strip */}
      <div className="mt-5 pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">DEMO INTEGRITY:</span>
          <span>Sample organizations and metrics are demonstrational prototypes.</span>
        </div>
        <Link 
          href="/dashboard"
          className="font-medium text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
        >
          <span>Open Full Client Workspace</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
