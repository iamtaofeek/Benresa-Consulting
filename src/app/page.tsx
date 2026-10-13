'use client';

import React from 'react';
import { InteractiveHeroPulse } from '@/components/InteractiveHeroPulse';
import { 
  VERIFIED_SERVICES, 
  VERIFIED_MANAGEMENT_TEAM, 
  VERIFIED_INDUSTRIES, 
  BENRESA_LEGAL_ENTITY 
} from '@/data/benresa-verified';
import { 
  Users, 
  UserCheck, 
  Receipt, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Building2, 
  Sparkles,
  ChevronRight,
  Flame,
  ShoppingBag,
  Cpu,
  Landmark,
  Factory
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Users,
  UserCheck,
  Receipt,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Flame,
  ShoppingBag,
  Cpu,
  Landmark,
  Factory,
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#070d1a] dark:via-[#0a1429] dark:to-[#070d1a] border-b border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-10 md:mb-14">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-[#102d73] dark:text-cyan-400 border border-blue-200 dark:border-blue-900/60 mb-5 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#102d73] dark:bg-cyan-400" />
              <span>BENRESA CONSULT LIMITED — BUSINESS & PEOPLE ADVISORY</span>
            </div>

            {/* Headline */}
            <h1
              className="big-text font-bold tracking-tight text-center mx-auto text-slate-900 dark:text-[rgb(245,247,250)]"
              style={{
                fontFamily: 'Manrope, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '88px',
                fontWeight: 700,
                lineHeight: '92.4px',
              }}
            >
              CLARITY FOR EVERY <br className="hidden sm:inline" />
              BUSINESS DECISION.
            </h1>

            {/* Subline */}
            <p
              className="small-text mt-6 leading-relaxed max-w-3xl mx-auto text-center text-slate-600 dark:text-[rgb(167,175,188)]"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '21.6px',
                fontWeight: 400,
                lineHeight: '33.48px',
              }}
            >
              Expert support across human resources, talent acquisition, tax compliance, and strategic management — redesigned for a connected, transparent client operations experience.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="/start"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#102d73] hover:bg-[#0c2258] text-white shadow-md hover:shadow-lg transition-all"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 transition-all shadow-xs"
              >
                <span>Explore Client Workspace</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Interactive Hero Canvas: Consulting Operations Pulse */}
          <div className="mt-4">
            <InteractiveHeroPulse />
          </div>
        </div>
      </section>

      {/* 2. Key Verified Value Proposition */}
      <section className="py-16 md:py-20 bg-white dark:bg-[#0c1427] border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                70%
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Execution-First Model
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Most firms stop at slide decks. 70% of our engagement is dedicated to co-owned ground execution alongside your leadership team.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-bold">
                100%
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Statutory Compliance
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Zero-penalty track record across Nigerian Labour Act, PAYE tax filings, NSITF, Pension Reform Act (PRA 2014), and LIRS/FIRS audit representation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
                SLA
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Trackable Operations
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every milestone, document requirement, and deliverable is logged, tracked, and signed off with transparency through Benresa Connect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sourced Service Catalog Grid */}
      <section className="py-20 md:py-24 bg-slate-50 dark:bg-[#070d1a] border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
                Verified Consulting Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Multidisciplinary Solutions for Nigerian Enterprises
              </h2>
            </div>
            <a
              href="/services"
              className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All 7 Services in Depth</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFIED_SERVICES.map((s) => {
              const Icon = ICON_MAP[s.iconName] || Briefcase;
              return (
                <div
                  key={s.id}
                  className="fintech-panel p-6 bg-white dark:bg-[#0c1427] flex flex-col justify-between group hover:-translate-y-1 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-white/5 text-[#102d73] dark:text-cyan-400 flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold uppercase">
                        {s.leadTimeWeeks}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {s.shortDesc}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Key Deliverables
                      </div>
                      {s.deliverables.slice(0, 3).map((d, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <a
                      href={`/services/${s.slug}`}
                      className="text-xs font-semibold text-slate-900 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 flex items-center gap-1"
                    >
                      <span>Service Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`/start?service=${s.id}`}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    >
                      Start Scope
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Product Storytelling Narrative: The 7 Chapters (Section 54) */}
      <section className="py-20 md:py-24 bg-white dark:bg-[#0c1427] border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              The Connected Consulting Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              How Advisory Engagements Unfold on Benresa Connect
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Replacing fragmented email attachments and vague verbal agreements with transparent, trackable milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">01 / DISCOVER</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pinpoint Business Needs</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Match organizational challenges directly with verified HR, tax, recruitment, or strategic practices.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">02 / DEFINE & SCOPE</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Build Tailored Scope</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Configure headcount, locations, statutory deliverables, and timelines with live complexity feedback.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">03 / PREFLIGHT</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Verify Documentation</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Deterministic preflight checks ensure required payroll, audit, and legal records are in place before kickoff.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">04 / AGREE</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Versioned Proposals</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Inspect V1-V3 revision histories, annotate sections, and approve immutable scopes with PDF export.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">05 / DELIVER</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Track Milestones & SLA</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Real-time visibility into current tasks, assigned owners, due dates, and automated operational risk alerts.
              </p>
            </div>

            {/* Step 6 */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">06 / REVIEW</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Side-by-Side Quality QC</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Compare delivered handbooks and filings directly against agreed specifications before formal sign-off.
              </p>
            </div>

            {/* Step 7 */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">07 / CONTINUE</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Repeat & Renew Seamlessly</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Reuse past approved scopes as baselines for recurring payroll retainers or quarterly tax filings.
              </p>
            </div>

            {/* Step 8 (CTA card) */}
            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">EXPLORE</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Try the Prototype</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Start an intake now or explore with preloaded client scenarios.
                </p>
              </div>
              <a
                href="/start"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-cyan-300 hover:underline pt-3"
              >
                <span>Launch Intake Wizard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Verified Management Team & Governance */}
      <section className="py-20 bg-slate-50 dark:bg-[#070d1a] border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Leadership & Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Meet Benresa's Management Team
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verified corporate officers sourced from benresaconsult.com/teams.html
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFIED_MANAGEMENT_TEAM.map((member, idx) => (
              <div 
                key={idx}
                className="fintech-panel p-5 bg-white dark:bg-[#0c1427] flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-white/10 text-blue-900 dark:text-cyan-300 font-bold text-base flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10">
                  {member.name.split(' ').slice(1).map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h4>
                  <div className="text-xs font-medium text-cyan-700 dark:text-cyan-400 mt-0.5">
                    {member.role}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mt-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Industries Served */}
      <section className="py-16 bg-white dark:bg-[#0c1427] border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sector Specialization
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Proven Experience Across High-Growth Sectors
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {VERIFIED_INDUSTRIES.map((ind, i) => {
              const Icon = ICON_MAP[ind.icon] || Building2;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center space-y-2"
                >
                  <div className="w-9 h-9 mx-auto rounded-lg bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-cyan-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{ind.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Conversion FAQ */}
      <section className="py-20 bg-slate-50 dark:bg-[#070d1a] border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Questions & Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                How does Benresa Consult differ from traditional management consulting firms?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                Traditional firms often leave you with an advisory report and exit. Benresa operates on an execution-first model: 70% of our engagement time is invested in hands-on ground implementation—such as training, regulatory liaison, and embedding HR systems—with defined KPIs.
              </p>
            </div>

            <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                What statutory tax services are included in your tax practice?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                We handle both Direct and Indirect Taxes under Nigerian law, including Personal Income Tax (PAYE) structuring, annual Form H1 returns, Tax Clearance Certificates (TCC) for Executive Directors and Staff, Withholding Tax (WHT) credits, and Company Income Tax (CIT) audit defense.
              </p>
            </div>

            <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                What is Benresa Connect and how does it relate to the company?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                Benresa Connect is an independent digital operations concept engineered for portfolio demonstration. It demonstrates how Benresa’s actual consulting services can be experienced with fintech-grade digital clarity, milestone tracking, and deterministic readiness scoring.
              </p>
            </div>

            <div className="fintech-panel p-5 bg-white dark:bg-[#0c1427]">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Where are your corporate offices located?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                Benresa Consult Limited is headquartered on Lateef Jakande Road, Ikeja, Lagos, Nigeria, with advisory support provided to corporate clients nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Cinematic Final CTA (Section 55) */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-[#102d73] via-[#0d2258] to-[#071333] text-white relative overflow-hidden">
        <div className="absolute inset-0 technical-grid-bg opacity-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-300 border border-white/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            READY TO ELEVATE YOUR OPERATIONS?
          </span>

          <h2
            className="big-text font-bold tracking-tight"
            style={{
              fontFamily: 'Manrope, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '88px',
              fontWeight: 700,
              lineHeight: '92.4px',
              color: 'rgb(245, 247, 250)',
            }}
          >
            LET'S MAKE THE NEXT STEP CLEAR.
          </h2>

          <p
            className="small-text mt-6 leading-relaxed max-w-3xl mx-auto"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '21.6px',
              fontWeight: 400,
              lineHeight: '33.48px',
              color: 'rgb(167, 175, 188)',
            }}
          >
            Explore Benresa's services or start a structured intake for the specific support your organization needs.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/start"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white text-[#102d73] hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all"
            >
              <span>Book a Consultation / Start Scoping</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <span>Explore Client Workspace (Concept)</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200/80">
            <span>📍 Lateef Jakande Road, Ikeja, Lagos</span>
            <span>📞 +234 903 275 2982</span>
            <span>✉️ info@benresaconsult.com</span>
          </div>
        </div>
      </section>
    </div>
  );
}
