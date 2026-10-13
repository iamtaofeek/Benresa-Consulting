'use client';

import React from 'react';
import { useDemoWorkspace } from '@/context/DemoWorkspaceContext';
import { Keyboard, X } from 'lucide-react';

export function KeyboardShortcutsModal() {
  const { isShortcutsOpen, setIsShortcutsOpen } = useDemoWorkspace();

  if (!isShortcutsOpen) return null;

  const shortcuts = [
    { key: 'Cmd/Ctrl + K', description: 'Open Global Command Palette' },
    { key: '?', description: 'Open this Keyboard Shortcuts Guide' },
    { key: 'Esc', description: 'Close any active modal, drawer, or search' },
    { key: 'Cmd/Ctrl + Z', description: 'Undo Scope Builder adjustments' },
    { key: 'Cmd/Ctrl + Shift + Z', description: 'Redo Scope Builder adjustments' },
    { key: 'Tab / Shift + Tab', description: 'Accessible keyboard focus navigation' },
    { key: 'Enter / Space', description: 'Activate buttons, tabs, and checklist items' },
    { key: 'Arrow Up / Down', description: 'Navigate command palette and select lists' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Power navigation across Benresa Connect</p>
            </div>
          </div>
          <button 
            onClick={() => setIsShortcutsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 divide-y divide-slate-100 dark:divide-white/5 max-h-[60vh] overflow-y-auto">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">{s.description}</span>
              <kbd className="px-2.5 py-1 text-xs font-mono font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-md shadow-xs">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 text-center">
          Press <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border">Esc</kbd> anytime to dismiss
        </div>
      </div>
    </div>
  );
}
