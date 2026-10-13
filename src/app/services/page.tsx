'use client';

import React, { useState } from 'react';
import { VERIFIED_SERVICES } from '@/data/benresa-verified';
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
  Filter,
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

export default function ServicesPage() {
  const [filter, setFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Services (7)' },
    { id: 'people', label: 'People & HR' },
    { id: 'tax', label: 'Tax & Compliance' },
    { id: 'strategy', label: 'Strategy & Operations' },
  ];

  const filteredServices = VERIFIED_SERVICES.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'people') return ['hr-consulting', 'talent-acquisition', 'outsourcing', 'learning-development'].includes(s.id);
    if (filter === 'tax') return ['tax-management', 'compliance'].includes(s.id);
    if (filter === 'strategy') return ['business-consulting', 'outsourcing'].includes(s.id);
    return true;
  });

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/60 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VERIFIED SERVICE TAXONOMY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Consulting Services
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            All services listed below reflect authentic corporate capabilities of Benresa Consult Limited, sourced from primary company documentation and restructured with fintech-grade transparency.
          </p>

          {/* Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by practice:
            </span>
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFilter(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === opt.id
                    ? 'bg-[#102d73] dark:bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((s) => {
            const Icon = ICON_MAP[s.iconName] || Briefcase;
            return (
              <div
                key={s.id}
                className="fintech-panel p-6 sm:p-7 bg-white dark:bg-[#0c1427] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-white/5 text-[#102d73] dark:text-cyan-400 flex items-center justify-center border border-slate-200 dark:border-white/10 shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                          {s.title}
                        </h2>
                        <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                          {s.leadTimeWeeks} lead time
                        </span>
                      </div>
                    </div>

                    {s.statHeadline && (
                      <div className="text-right shrink-0">
                        <div className="text-base font-bold font-mono text-[#102d73] dark:text-cyan-400">
                          {s.statHeadline}
                        </div>
                        <div className="text-[10px] text-slate-500 max-w-[120px] leading-tight">
                          {s.statLabel}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                    {s.fullDesc}
                  </p>

                  {/* Deliverables Section */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Core Practice Deliverables
                    </div>
                    <ul className="space-y-1.5">
                      {s.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Target Audience */}
                  <div className="text-xs text-slate-500 mb-4">
                    <strong className="text-slate-700 dark:text-slate-300">Target Organizations: </strong>
                    {s.targetAudience}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`/services/${s.slug}`}
                    className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Service Deep-Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`/start?service=${s.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#102d73] hover:bg-[#0c2258] text-white transition-colors"
                  >
                    <span>Configure Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
