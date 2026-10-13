'use client';

import React from 'react';
import Link from 'next/link';
import { BENRESA_LEGAL_ENTITY, VERIFIED_SERVICES } from '@/data/benresa-verified';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { useTheme } from '@/context/ThemeContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  RotateCcw, 
  Sun, 
  Moon,
  Sparkles
} from 'lucide-react';

export function Footer() {
  const { resetDemoWorkspace, startTour, setIsCmdKOpen } = useDemoWorkspace();
  const { actualTheme, toggleTheme } = useTheme();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#070d1a] text-slate-700 dark:text-slate-300 transition-colors">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 & 2: Brand & Verified Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 px-2 py-1 bg-white rounded-md border border-slate-200 dark:border-white/20 shadow-xs flex items-center">
                <img
                  src="/benresa-logo.png"
                  alt="Benresa Consult Limited"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase block">
                  {BENRESA_LEGAL_ENTITY.name}
                </span>
                <span className="text-[11px] font-medium text-cyan-600 dark:text-cyan-400 block">
                  {BENRESA_LEGAL_ENTITY.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Multidisciplinary professional business solution services across human resources, talent acquisition & outsourcing, payroll management, regulatory tax advisory, and strategic business consulting to small and corporate organizations in Nigeria.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{BENRESA_LEGAL_ENTITY.headquarters.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{BENRESA_LEGAL_ENTITY.headquarters.phones.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href={`mailto:${BENRESA_LEGAL_ENTITY.headquarters.emails[0]}`} className="hover:underline">
                  {BENRESA_LEGAL_ENTITY.headquarters.emails[0]}
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Sourced Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Consulting Services
            </h4>
            <ul className="space-y-2 text-xs">
              {VERIFIED_SERVICES.map((s) => (
                <li key={s.id}>
                  <Link 
                    href={`/services/${s.slug}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Client Operations Concept */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Benresa Connect
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400">
                  Client Overview Dashboard
                </Link>
              </li>
              <li>
                <Link href="/start" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400">
                  7-Step Intake & Scoping
                </Link>
              </li>
              <li>
                <Link href="/operations" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400">
                  Internal Consulting Ops
                </Link>
              </li>
              <li>
                <Link href="/quality" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400">
                  Deliverable QC & Verification
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400">
                  Operations Intelligence
                </Link>
              </li>
              <li>
                <Link href="/case-study" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400">
                  Architecture Case Study
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Live Links & Verification */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Official & Socials
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href={BENRESA_LEGAL_ENTITY.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={BENRESA_LEGAL_ENTITY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400"
              >
                <span>LinkedIn Company</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={BENRESA_LEGAL_ENTITY.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400"
              >
                <span>Instagram Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={resetDemoWorkspace}
                className="text-xs px-2.5 py-1.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 flex items-center gap-1.5"
                title="Reset synthetic demo data"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo</span>
              </button>
              <button
                suppressHydrationWarning
                onClick={toggleTheme}
                className="text-xs px-2.5 py-1.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20 flex items-center gap-1.5"
                title="Toggle Theme"
              >
                {actualTheme === 'dark' ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3" />}
                <span>{actualTheme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Disclaimer & Copyright Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#050a14] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>
              <strong>Concept Prototype Disclosure:</strong> Independent frontend engineering demonstration. Preserves verified corporate identity and services of Benresa Consult Limited.
            </span>
          </div>
          <div>
            © 2026 Benresa Consult Limited. Concept redesign by Lead Software Engineer candidate.
          </div>
        </div>
      </div>
    </footer>
  );
}
