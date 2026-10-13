'use client';

import React from 'react';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { Sparkles, ArrowRight, ArrowLeft, X, CheckCircle2 } from 'lucide-react';

export function GuidedDemoTour() {
  const { isTourActive, tourStep, nextTourStep, prevTourStep, endTour, setPersonaId } = useDemoWorkspace();

  if (!isTourActive) return null;

  const tourSteps = [
    {
      title: 'Welcome to Benresa Connect Concept',
      subtitle: 'A Fintech-Grade Corporate Advisory Experience',
      content: 'This independent portfolio concept demonstrates how Benresa Consult Limited can combine its authentic HR, tax, and business advisory services with modern, trackable digital client operations.',
      badge: 'Step 1 of 6',
      action: () => {},
    },
    {
      title: '1. Verified Business Foundations',
      subtitle: 'Authentic Identity & Sourced Services',
      content: 'All 7 service lines (HR Consulting, Talent Acquisition, Tax Management, Compliance, Outsourcing, Learning, Business Consulting) and company leadership are grounded in verified public data from benresaconsult.com.',
      badge: 'Step 2 of 6',
      action: () => {},
    },
    {
      title: '2. Multi-Persona Interactive Switcher',
      subtitle: 'Experience from 3 Distinct Perspectives',
      content: 'Toggle seamlessly between Client Executive (Adaeze Okonkwo), Lead Consultant (COO Taofeek Ambaliyu), and Operations Director (CEO Theresa Uzoigwe) to see how data and permissions adapt.',
      badge: 'Step 3 of 6',
      action: () => setPersonaId('consultant'),
    },
    {
      title: '3. 7-Step Consultation & Scoping Wizard',
      subtitle: 'From Business Need to Structured Scope',
      content: 'Experience the intake wizard at /start with live deterministic readiness scoring, document preflight checks, and draft persistence with zero fabricated backend claims.',
      badge: 'Step 4 of 6',
      action: () => {},
    },
    {
      title: '4. Versioned Proposals & Real Approvals',
      subtitle: 'Version Control for Statements of Work',
      content: 'Inspect V1.0 to V3.0 revision timelines, add section comments, approve immutable versions in demo state, and generate downloadable branded PDF proposals with jsPDF.',
      badge: 'Step 5 of 6',
      action: () => {},
    },
    {
      title: '5. Deliverable QC & Operations Intelligence',
      subtitle: 'Requested vs Delivered Alignment & Risk Radar',
      content: 'Explore /quality to compare approved scope against delivered HR policy handbooks, run simulated assisted rule checks, and resolve operational SLA risks.',
      badge: 'Step 6 of 6',
      action: () => {},
    },
  ];

  const current = tourSteps[tourStep] || tourSteps[0];
  const isLast = tourStep === tourSteps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#0c1427] border border-blue-500/30 dark:border-blue-400/30 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Top Bar */}
        <div className="h-1 bg-slate-100 dark:bg-white/10 w-full">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
            style={{ width: `${((tourStep + 1) / tourSteps.length) * 100}%` }}
          />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
              <Sparkles className="w-3.5 h-3.5" />
              {current.badge}
            </span>
            <button 
              onClick={endTour}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{current.title}</h3>
          <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 mb-3">{current.subtitle}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{current.content}</p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
            <button
              onClick={prevTourStep}
              disabled={tourStep === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={endTour}
                className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Skip Tour
              </button>
              <button
                onClick={() => {
                  current.action();
                  if (isLast) {
                    endTour();
                  } else {
                    nextTourStep();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                {isLast ? (
                  <>
                    <span>Finish Tour</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
