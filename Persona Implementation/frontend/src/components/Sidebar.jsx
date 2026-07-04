import React from 'react';

export default function Sidebar({ selectedPersona, setSelectedPersona }) {
  return (
    <div className="lg:col-span-1 flex flex-col gap-6">
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Choose Instructor</h2>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => setSelectedPersona('hitesh')}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
              selectedPersona === 'hitesh' 
                ? 'bg-emerald-950/20 border-emerald-500 text-slate-100 shadow-md shadow-emerald-500/5' 
                : 'bg-slate-950 border-slate-850 hover:border-slate-850 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">Hitesh Choudhary</span>
              {selectedPersona === 'hitesh' && (
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              )}
            </div>
          </button>

          <button 
            onClick={() => setSelectedPersona('piyush')}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
              selectedPersona === 'piyush' 
                ? 'bg-indigo-950/20 border-indigo-500 text-slate-100 shadow-md shadow-indigo-500/5' 
                : 'bg-slate-950 border-slate-850 hover:border-slate-850 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">Piyush Garg</span>
              {selectedPersona === 'piyush' && (
                <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
