import React from 'react';

export default function Header({ selectedPersona }) {
  const themeLogoBg = selectedPersona === 'hitesh' 
    ? 'from-emerald-500 to-teal-500 shadow-emerald-500/20' 
    : 'from-violet-500 to-indigo-500 shadow-indigo-500/20';

  const themeTextGradient = selectedPersona === 'hitesh' 
    ? 'from-emerald-200 to-teal-100' 
    : 'from-violet-200 to-indigo-100';

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${themeLogoBg} flex items-center justify-center shadow-lg transition-all duration-500`}>
          <span className="text-white font-bold text-xl">
            {selectedPersona === 'hitesh' ? 'H' : 'P'}
          </span>
        </div>
        <div>
          <h1 className={`text-lg font-bold bg-gradient-to-r ${themeTextGradient} bg-clip-text text-transparent leading-none transition-all duration-500`}>
            Persona Implementation
          </h1>
          <p className="text-xs text-slate-400 mt-1">Simulating Hitesh Choudhary & Piyush Garg</p>
        </div>
      </div>
    </header>
  );
}
