'use client';

import React, { useState } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { VERIFIED_SERVICES, DEMO_PERSONAS } from '@/data/benresa-verified';
import { 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw,
  Check,
  Briefcase
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { actualTheme, toggleTheme } = useTheme();
  const { 
    setIsCmdKOpen, 
    personaId, 
    setPersonaId, 
    currentPersona, 
    startTour, 
    resetDemoWorkspace 
  } = useDemoWorkspace();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);

  const isWorkspace = pathname.startsWith('/dashboard') || 
                      pathname.startsWith('/operations') || 
                      pathname.startsWith('/quality') || 
                      pathname.startsWith('/analytics') || 
                      pathname.startsWith('/engagements');

  return (
    <header 
      suppressHydrationWarning 
      className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#070d1a]/90 backdrop-blur-md transition-colors"
    >
      {/* Topmost Proof Strip */}
      <div className="bg-[#102d73] dark:bg-[#0a1429] text-white text-[11px] font-medium py-1.5 px-4 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-cyan-300 font-semibold">
              <ShieldCheck className="w-3 h-3" />
              BENRESA CONSULT LIMITED
            </span>
            <span className="hidden md:inline text-blue-200/60">•</span>
            <span className="hidden md:inline text-slate-300">
              Lateef Jakande Road, Ikeja, Lagos
            </span>
            <span className="hidden lg:inline text-blue-200/60">•</span>
            <span className="hidden lg:inline text-slate-300">
              +234 903 275 2982
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={startTour}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>Guided Tour</span>
            </button>
            <span className="text-blue-200/60">•</span>
            <a 
              href="https://www.benresaconsult.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Official Site ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div suppressHydrationWarning className="flex items-center gap-6 lg:gap-8 shrink-0">
            <a href="/" className="flex items-center gap-3 group shrink-0">
              <div className="h-10 px-2.5 py-1 bg-white rounded-lg border border-slate-200 dark:border-white/20 shadow-xs flex items-center shrink-0">
                {/* Authentic Logo */}
                <img
                  src="/benresa-logo.png"
                  alt="Benresa Consult Limited Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div className="hidden lg:block leading-tight shrink-0">
                <div className="text-xs font-semibold tracking-wide text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
                  BENRESA CONSULT
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase font-medium whitespace-nowrap">
                  Business & People Advisory
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <a
                  href="/services"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname.startsWith('/services') 
                      ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </a>

                {servicesDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-80 bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                      Verified Sourced Capabilities
                    </div>
                    {VERIFIED_SERVICES.map((s) => (
                      <a
                        key={s.id}
                        href={`/services/${s.slug}`}
                        className="flex flex-col px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                      >
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                          {s.title}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {s.shortDesc}
                        </span>
                      </a>
                    ))}
                    <div className="mt-1 pt-1 border-t border-slate-100 dark:border-white/5">
                      <a
                        href="/services"
                        className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline"
                      >
                        <span>View All Services Catalog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Workspace Navigation */}
              <a
                href="/dashboard"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === '/dashboard' 
                    ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/60 dark:bg-blue-950/40' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
                }`}
              >
                Client Workspace
              </a>

              <a
                href="/operations"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === '/operations' 
                    ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/60 dark:bg-blue-950/40' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
                }`}
              >
                Operations Hub
              </a>

              <a
                href="/quality"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === '/quality' 
                    ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/60 dark:bg-blue-950/40' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
                }`}
              >
                Quality Review
              </a>

              <a
                href="/case-study"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === '/case-study' 
                    ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
                }`}
              >
                Behind Concept
              </a>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setIsCmdKOpen(true)}
              className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg transition-colors"
              title="Search and commands"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border rounded text-slate-500">
                ⌘K
              </kbd>
            </button>

            {/* Persona Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setPersonaMenuOpen(!personaMenuOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-xs transition-colors"
                title="Switch demo persona"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                  {currentPersona.avatar}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[90px]">
                    {currentPersona.name.split(' ')[0]}
                  </div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-400 leading-none">
                    {currentPersona.badge}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {personaMenuOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-2 z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    Select Demo Perspective
                  </div>
                  {DEMO_PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPersonaId(p.id);
                        setPersonaMenuOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                        p.id === personaId
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100'
                          : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {p.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold flex items-center justify-between">
                          <span>{p.name}</span>
                          {p.id === personaId && <Check className="w-3.5 h-3.5 text-blue-600" />}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {p.role}
                        </div>
                        <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium mt-0.5">
                          {p.organization}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              suppressHydrationWarning
              onClick={toggleTheme}
              aria-label={actualTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={actualTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {actualTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-200" />
              )}
            </button>

            {/* Primary Action Button */}
            <a
              href="/start"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#102d73] hover:bg-[#0c2258] text-white shadow-sm transition-all"
            >
              <span>Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#070d1a] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <a
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Home
          </a>
          <a
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Services Catalog
          </a>
          <a
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Client Workspace
          </a>
          <a
            href="/operations"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Operations Hub
          </a>
          <a
            href="/quality"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Deliverable QC Review
          </a>
          <a
            href="/analytics"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Intelligence & Reports
          </a>
          <a
            href="/case-study"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            Behind the Concept
          </a>

          <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                {actualTheme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  resetDemoWorkspace();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-slate-500 flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-300 px-2 py-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
            <button
              onClick={() => {
                setIsCmdKOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs text-blue-600 dark:text-cyan-400 font-medium"
            >
              Search (⌘K)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
