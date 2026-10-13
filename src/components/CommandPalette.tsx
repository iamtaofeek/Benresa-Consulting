'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { useTheme } from '@/context/ThemeContext';
import { 
  Search, 
  ArrowRight, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  RotateCcw, 
  Sun, 
  Moon, 
  Laptop,
  BookOpen, 
  Briefcase,
  X
} from 'lucide-react';

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Services' | 'Persona' | 'Actions';
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { isCmdKOpen, setIsCmdKOpen, setPersonaId, resetDemoWorkspace, engagements, setActiveEngagementId } = useDemoWorkspace();
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCmdKOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCmdKOpen]);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Corporate Homepage',
      subtitle: 'Public redesigned landing experience',
      icon: Briefcase,
      action: () => { router.push('/'); setIsCmdKOpen(false); },
    },
    {
      id: 'nav-services',
      category: 'Navigation',
      title: 'Service Catalog',
      subtitle: 'Explore all 7 verified Benresa service categories',
      icon: Layers,
      action: () => { router.push('/services'); setIsCmdKOpen(false); },
    },
    {
      id: 'nav-start',
      category: 'Navigation',
      title: 'Start Consultation Wizard',
      subtitle: '7-step interactive client onboarding & scoping',
      icon: ArrowRight,
      action: () => { router.push('/start'); setIsCmdKOpen(false); },
    },
    {
      id: 'nav-dashboard',
      category: 'Navigation',
      title: 'Client Workspace (Benresa Connect)',
      subtitle: 'View milestones, documents, and proposal status',
      icon: CheckCircle2,
      action: () => { router.push('/dashboard'); setIsCmdKOpen(false); },
    },
    {
      id: 'nav-operations',
      category: 'Navigation',
      title: 'Consulting Operations Hub',
      subtitle: 'Internal advisory ops, SLA radar, and risk triage',
      icon: ShieldCheck,
      action: () => { router.push('/operations'); setIsCmdKOpen(false); },
    },
    {
      id: 'nav-quality',
      category: 'Navigation',
      title: 'Deliverable Quality & Review Workspace',
      subtitle: 'Side-by-side requested vs delivered inspection',
      icon: FileText,
      action: () => { router.push('/quality'); setIsCmdKOpen(false); },
    },
    {
      id: 'nav-analytics',
      category: 'Navigation',
      title: 'Operations Intelligence & Analytics',
      subtitle: 'SLA throughput, risk distribution, and category mix',
      icon: BarChart3,
      action: () => { router.push('/analytics'); setIsCmdKOpen(false); },
    },
    {
      id: 'nav-casestudy',
      category: 'Navigation',
      title: 'Behind the Concept (Case Study)',
      subtitle: 'Engineering design rationale & technical decisions',
      icon: BookOpen,
      action: () => { router.push('/case-study'); setIsCmdKOpen(false); },
    },

    // Personas
    {
      id: 'persona-client',
      category: 'Persona',
      title: 'Switch Persona: Client (Adaeze Okonkwo)',
      subtitle: 'Apex Logistics Plc — Chief People Officer',
      icon: Users,
      action: () => { setPersonaId('client'); setIsCmdKOpen(false); },
    },
    {
      id: 'persona-consultant',
      category: 'Persona',
      title: 'Switch Persona: Lead Consultant (Mr Taofeek Ambaliyu)',
      subtitle: 'Benresa Consult Limited — Chief Operating Officer',
      icon: Users,
      action: () => { setPersonaId('consultant'); setIsCmdKOpen(false); },
    },
    {
      id: 'persona-ops',
      category: 'Persona',
      title: 'Switch Persona: Operations Lead (Mrs Theresa Uzoigwe)',
      subtitle: 'Benresa Consult Limited — CEO / Executive Ops',
      icon: Users,
      action: () => { setPersonaId('operations'); setIsCmdKOpen(false); },
    },

    // Engagements
    ...engagements.map((eng) => ({
      id: `eng-${eng.id}`,
      category: 'Actions' as const,
      title: `Open Engagement: ${eng.referenceCode}`,
      subtitle: `${eng.clientName} — ${eng.serviceTitle}`,
      icon: FileText,
      action: () => {
        setActiveEngagementId(eng.id);
        router.push(`/engagements/${eng.id}`);
        setIsCmdKOpen(false);
      },
    })),

    // Actions & Theme
    {
      id: 'act-theme-toggle',
      category: 'Actions',
      title: `Toggle Theme (Currently: ${actualTheme === 'dark' ? 'Dark' : 'Light'})`,
      subtitle: `Switch immediately to ${actualTheme === 'dark' ? 'Light' : 'Dark'} mode`,
      icon: actualTheme === 'dark' ? Sun : Moon,
      action: () => { toggleTheme(); setIsCmdKOpen(false); },
    },
    {
      id: 'act-theme-light',
      category: 'Actions',
      title: 'Set Theme: Light Mode',
      subtitle: 'Crisp corporate aesthetic with subtle gray-blue technical background',
      icon: Sun,
      action: () => { setTheme('light'); setIsCmdKOpen(false); },
    },
    {
      id: 'act-theme-dark',
      category: 'Actions',
      title: 'Set Theme: Dark Mode (Fintech Deep Canvas)',
      subtitle: 'Deep navy-indigo canvas (#070d1a) with high contrast text and cyan accents',
      icon: Moon,
      action: () => { setTheme('dark'); setIsCmdKOpen(false); },
    },
    {
      id: 'act-theme-system',
      category: 'Actions',
      title: 'Set Theme: Sync with System Preference',
      subtitle: 'Automatically follow your operating system appearance',
      icon: Laptop,
      action: () => { setTheme('system'); setIsCmdKOpen(false); },
    },
    {
      id: 'act-reset',
      category: 'Actions',
      title: 'Reset Demo Workspace',
      subtitle: 'Restore synthetic seed data and undo stacks',
      icon: RotateCcw,
      action: () => { resetDemoWorkspace(); setIsCmdKOpen(false); },
    },
  ];

  const filtered = commands.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isCmdKOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-white/10 gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search (e.g. Services, Dashboard, Persona, Tax)..."
            className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none"
          />
          <button 
            onClick={() => setIsCmdKOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-white/5">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No matching commands or routes found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                    isSelected 
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-md ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-medium truncate">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.subtitle}</div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Use <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border rounded">↑</kbd> <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border rounded">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border rounded">Enter</kbd> to select</span>
          </div>
          <span><kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border rounded">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
