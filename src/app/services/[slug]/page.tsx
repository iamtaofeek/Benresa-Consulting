'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { VERIFIED_SERVICES, BENRESA_LEGAL_ENTITY } from '@/data/benresa-verified';
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
  Shield, 
  Layers, 
  ChevronLeft,
  Sparkles
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Users,
  UserCheck,
  Receipt,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  TrendingUp,
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const service = VERIFIED_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center px-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Service Not Found</h1>
        <p className="text-sm text-slate-500 mt-2">
          The requested service "{slug}" is not indexed in Benresa's verified taxonomy.
        </p>
        <Link 
          href="/services" 
          className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Services Catalog</span>
        </Link>
      </div>
    );
  }

  const Icon = ICON_MAP[service.iconName] || Briefcase;

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Back Link */}
        <Link 
          href="/services" 
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Services Catalog</span>
        </Link>

        {/* Hero Card */}
        <div className="fintech-panel-elevated p-6 sm:p-8 md:p-10 bg-white dark:bg-[#0c1427] mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-white/5 text-[#102d73] dark:text-cyan-400 flex items-center justify-center border border-slate-200 dark:border-white/10 shrink-0">
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 mb-2">
                  <ShieldCheck className="w-3 h-3" />
                  <span>VERIFIED CAPABILITY • {BENRESA_LEGAL_ENTITY.name}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {service.title}
                </h1>
                <p className="text-xs sm:text-sm text-cyan-700 dark:text-cyan-400 font-medium mt-1">
                  Indicative Timeline: {service.leadTimeWeeks}
                </p>
              </div>
            </div>

            <a
              href={`/start?service=${service.id}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#102d73] hover:bg-[#0c2258] text-white shadow-md transition-all shrink-0"
            >
              <span>Start Intake for this Service</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
            <p>{service.fullDesc}</p>
          </div>
        </div>

        {/* 2-Column Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Deliverables Panel */}
          <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Standard Deliverables</span>
            </h3>
            <ul className="space-y-3">
              {service.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Strategic Benefits */}
          <div className="fintech-panel p-6 bg-white dark:bg-[#0c1427]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Strategic Value Proposition</span>
            </h3>
            <ul className="space-y-3">
              {service.keyBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Engagement Delivery Models & Target Audience */}
        <div className="fintech-panel p-6 sm:p-7 bg-white dark:bg-[#0c1427] mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Available Engagement Models
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.engagementModels.map((m, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Organizational Fit
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.targetAudience}
              </p>
            </div>
          </div>
        </div>

        {/* Direct Action Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#102d73] to-blue-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">Ready to Scope {service.title}?</h3>
            <p className="text-xs text-blue-200 mt-1 max-w-md">
              Launch our interactive 7-step wizard to configure your organizational requirements, inspect readiness, and receive a statement of work.
            </p>
          </div>
          <Link
            href={`/start?service=${service.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#102d73] text-xs font-bold shadow-md hover:bg-blue-50 transition-colors shrink-0"
          >
            <span>Proceed to Intake Wizard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
