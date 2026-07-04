import React from 'react';

export default function ChatInput({ 
  input, 
  setInput, 
  onSubmit, 
  isLoading, 
  persona 
}) {
  const sendBtnBg = persona === 'hitesh'
    ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/10'
    : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/10';

  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-slate-800/80 bg-slate-900/40 flex items-center gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Ask ${persona === 'hitesh' ? 'Hitesh' : 'Piyush'} a programming question...`}
        disabled={isLoading}
        className="flex-1 bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className={`${sendBtnBg} disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition shadow-lg cursor-pointer disabled:cursor-not-allowed flex items-center gap-1 transition-all duration-300`}
      >
        Send
      </button>
    </form>
  );
}
