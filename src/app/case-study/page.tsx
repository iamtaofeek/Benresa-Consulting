'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Code2, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Cpu, 
  BookOpen, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { BENRESA_LEGAL_ENTITY } from '@/data/benresa-verified';

export default function CaseStudyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-white/10 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/60 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ENGINEERING CASE STUDY & ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Behind the Concept: Benresa Reimagined
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            How a principal frontend engineering approach transformed traditional professional advisory into a fintech-grade, trackable client operations experience.
          </p>
        </div>

        {/* Section 1: Executive Thesis */}
        <div className="fintech-panel p-6 sm:p-8 bg-white dark:bg-[#0c1427] space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>1. The Core Engineering Challenge</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Benresa Consult Limited has established genuine trust in Nigeria across high-stakes corporate domains—including labour law compliance, executive talent search, and state tax authority reconciliations. However, traditional consulting workflows frequently suffer from fragmented email threads, opaque statement of work revisions, and untracked deliverable handoffs.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            The goal of this project was not to invent a fictional company or pretend Benresa is a financial institution, but rather to bring <strong>fintech-grade UI polish, deterministic state machines, and operational clarity</strong> to Benresa's authentic consulting services.
          </p>
        </div>

        {/* Section 2: Content Provenance Model */}
        <div className="fintech-panel p-6 sm:p-8 bg-white dark:bg-[#0c1427] space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>2. Strict Content Provenance Model</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            To prevent hallucinations or fabricated company claims, the application enforces a strict internal classification:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs space-y-1.5">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 uppercase block font-mono">
                [VERIFIED CONTENT]
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Directly sourced from <strong>benresaconsult.com</strong>: Legal name ({BENRESA_LEGAL_ENTITY.name}), address (Ikeja, Lagos), phones, management team (CEO Theresa Uzoigwe, COO Taofeek Ambaliyu), all 7 service offerings, and brand color palette (#102d73, #4cc4d3, #fb9c1a).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-1.5">
              <span className="font-bold text-blue-800 dark:text-cyan-300 uppercase block font-mono">
                [PROPOSED COPY]
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Refined portfolio copy crafted to elevate conversion: "Business clarity. Delivered beautifully.", 70% execution narrative, and structured onboarding explanations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase block font-mono">
                [DEMO SYNTHETIC DATA]
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Demonstrational organizations (Apex Logistics Plc, Sterling Global), reference codes (DEMO-BEN-2026-001), mock handbooks, and simulated risk alerts. Clearly labeled in every UI surface.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Tech Stack & System Craft */}
        <div className="fintech-panel p-6 sm:p-8 bg-white dark:bg-[#0c1427] space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>3. Technical Architecture & Engineering Decisions</span>
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div>
              <strong className="text-slate-900 dark:text-white">• Next.js 15+ App Router & React 19: </strong>
              Utilizes modern React paradigms, typed routing, performant client-side state boundaries, and clean hydration.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white">• Dual First-Class Light & Dark Themes: </strong>
              Neither mode is an automated inversion. Both are hand-crafted using semantic CSS variables, fine 1px technical borders, tuned shadows, and WCAG AA contrast.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white">• Client-Side Undo / Redo Engine: </strong>
              Scope Builder and deliverable configurations maintain an immutable history stack allowing Cmd/Ctrl+Z undo and Cmd/Ctrl+Shift+Z redo.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white">• jsPDF Corporate Document Generation: </strong>
              Client proposals and statements of work can be downloaded directly as formatted vector PDF documents with authentic corporate branding.
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white">• Vitest Unit & Domain Test Suite: </strong>
              Deterministic business rules, complexity formulas, and proposal approval state machines are covered by comprehensive unit tests.
            </div>
          </div>
        </div>

        {/* Section 4: Transparency & Attribution */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-cyan-600" />
            <span>Independent Portfolio Disclosure</span>
          </div>
          <p className="leading-relaxed">
            This redesign and product prototype was conceptualized and authored independently by a Software Engineering candidate for Benresa Consult Limited's technical recruitment evaluation. It is not an official company product release and does not access internal Benresa database endpoints.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://www.benresaconsult.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Visit Official Benresa Consult Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
