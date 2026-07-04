import React from 'react';

function FormattedMessage({ content }) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const match = part.match(/```(\w*)\n([\s\S]*?)```/);
          const lang = match ? match[1] : '';
          const code = match ? match[2].trim() : part.slice(3, -3).trim();

          return (
            <div key={index} className="my-3 rounded-lg overflow-hidden border border-slate-700/60 bg-slate-950 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between bg-slate-900 px-4 py-1.5 border-b border-slate-700/40 text-slate-400 text-[10px] uppercase font-bold">
                <span>{lang || 'code'}</span>
                <button 
                  type="button"
                  onClick={() => navigator.clipboard.writeText(code)}
                  className="hover:text-white transition cursor-pointer"
                >
                  Copy
                </button>
              </div>
              <pre className="p-3 overflow-x-auto"><code>{code}</code></pre>
            </div>
          );
        }

        const lines = part.split('\n');
        return (
          <div key={index} className="space-y-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ');
              const cleanedLine = isBullet ? trimmed.substring(2) : line;

              const inlineRegex = /(\*\*.*?\*\*|`.*?`)/g;
              const segments = cleanedLine.split(inlineRegex);

              const elements = segments.map((seg, sIdx) => {
                if (seg.startsWith('**') && seg.endsWith('**')) {
                  return <strong key={sIdx} className="font-extrabold text-slate-100">{seg.slice(2, -2)}</strong>;
                }
                if (seg.startsWith('`') && seg.endsWith('`')) {
                  return <code key={sIdx} className="bg-slate-950/80 text-indigo-300 px-1 py-0.5 rounded font-mono text-xs border border-slate-700/30">{seg.slice(1, -1)}</code>;
                }
                return seg;
              });

              if (isBullet) {
                return (
                  <ul key={lIdx} className="list-disc list-inside ml-2 text-slate-300">
                    <li className="pl-1">{elements}</li>
                  </ul>
                );
              }

              return <p key={lIdx} className="min-h-[1.2em]">{elements}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function MessageItem({ message, persona }) {
  const isUser = message.role === 'user';
  
  const userBubbleBg = persona === 'hitesh'
    ? 'bg-gradient-to-r from-emerald-600 to-teal-650'
    : 'bg-gradient-to-r from-violet-600 to-indigo-650';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
        isUser 
          ? `${userBubbleBg} text-white rounded-br-none` 
          : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/50'
      } transition-all duration-300`}>
        <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">
          {isUser ? 'You' : persona === 'hitesh' ? 'Hitesh' : 'Piyush'}
        </div>
        <FormattedMessage content={message.content} />
      </div>
    </div>
  );
}
