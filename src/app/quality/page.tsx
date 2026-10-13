'use client';

import React, { useState } from 'react';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { QualityReviewItem } from '@/types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  Columns, 
  RotateCcw, 
  Check, 
  X,
  ShieldCheck,
  Download
} from 'lucide-react';

export default function QualityReviewPage() {
  const { qualityReviewItems, updateQualityItemStatus } = useDemoWorkspace();
  const [isRunningAi, setIsRunningAi] = useState(false);
  const [aiStep, setAiStep] = useState<string>('');
  const [activeReviewId, setActiveReviewId] = useState<string>(qualityReviewItems[0]?.id || 'qr-01');

  const activeItem = qualityReviewItems.find((q) => q.id === activeReviewId) || qualityReviewItems[0];

  const handleRunPrototypeReview = () => {
    setIsRunningAi(true);
    setAiStep('1/4 Checking deliverable document format & typography...');
    setTimeout(() => {
      setAiStep('2/4 Matching scope clauses against statutory benchmark...');
      setTimeout(() => {
        setAiStep('3/4 Cross-referencing Nigerian Labour Act & PRA 2014 formulas...');
        setTimeout(() => {
          setAiStep('4/4 Compiling deliverable quality scorecard...');
          setTimeout(() => {
            setIsRunningAi(false);
            setAiStep('');
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const passCount = qualityReviewItems.filter(q => q.status === 'PASS' || q.status === 'EXCEEDS').length;
  const overallQualityPercent = Math.round((passCount / qualityReviewItems.length) * 100);

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1">
              DELIVERABLE VERIFICATION & QUALITY AUDIT
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Deliverable Quality Review Workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Side-by-side comparison verifying delivered advisory artifacts match the agreed client scope specifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunPrototypeReview}
              disabled={isRunningAi}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-700 to-cyan-600 text-white shadow-md hover:from-blue-800 hover:to-cyan-700 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>{isRunningAi ? aiStep : 'Run Prototype QC Check'}</span>
            </button>
          </div>
        </div>

        {/* Quality Scorecard Banner */}
        <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg font-mono">
              {overallQualityPercent}%
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Deliverable Compliance Parity: {passCount} of {qualityReviewItems.length} Standards Passed
              </div>
              <div className="text-xs text-slate-500">
                Helios Health Systems — Harmonized Employee Handbook & Clinical Shift Protocol (DEMO-BEN-2026-003)
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            <span>Deterministic verification against Nigerian statutory standards</span>
          </div>
        </div>

        {/* Main Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Standards Checklist Navigation (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Quality Audit Criteria ({qualityReviewItems.length})
            </div>

            {qualityReviewItems.map((item) => {
              const isSelected = item.id === activeReviewId;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveReviewId(item.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-cyan-400 shadow-xs'
                      : 'bg-white dark:bg-[#0c1427] border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {item.criterion}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      item.status === 'EXCEEDS' || item.status === 'PASS'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {item.scopeRequirement}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Side-by-Side Comparison Inspector (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="fintech-panel-elevated p-6 bg-white dark:bg-[#0c1427]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10 mb-5">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-600 uppercase">
                    STANDARD INSPECTION #{activeItem.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeItem.criterion}
                  </h3>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5">
                  {(['PASS', 'NEEDS_REVISION', 'EXCEEDS'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateQualityItemStatus(activeItem.id, st)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono transition-colors ${
                        activeItem.status === st
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Side-by-Side Dual View */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Side A: Agreed Scope Requirement */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Approved Scope Requirement</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                    {activeItem.scopeRequirement}
                  </p>
                </div>

                {/* Side B: Delivered Artifact Excerpt */}
                <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Delivered Handbook Excerpt</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-mono">
                    "{activeItem.deliveredArtifactSnippet}"
                  </p>
                </div>
              </div>

              {/* Reviewer Audit Notes */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 space-y-3">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Lead Consultant Audit Commentary:
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300">
                  {activeItem.reviewerNotes}
                </div>

                {activeItem.flaggedAiObservation && (
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Automated QC Rule Observation:</strong> {activeItem.flaggedAiObservation}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-500 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <span>
                <strong>Audit Compliance Guarantee:</strong> QC checks verify syntactic alignment with Nigerian statutory regulations. Final deliverable sign-offs are co-signed by Benresa's Lead Advisory Partner and Client Legal Counsel.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
