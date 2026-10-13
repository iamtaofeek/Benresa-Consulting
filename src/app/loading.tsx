import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-blue-600 dark:border-cyan-400 border-t-transparent animate-spin" />
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide">
        Loading Benresa Connect...
      </span>
    </div>
  );
}
