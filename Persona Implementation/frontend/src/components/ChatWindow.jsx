import React from 'react';
import MessageItem from './MessageItem.jsx';
import ChatInput from './ChatInput.jsx';

export default function ChatWindow({ 
  messages, 
  isLoading, 
  persona, 
  messagesEndRef, 
  input,
  setInput,
  onSubmit
}) {
  const themeAccentColor = persona === 'hitesh' ? 'emerald' : 'indigo';

  return (
    <div className="lg:col-span-3 bg-slate-900/30 border border-slate-800 rounded-2xl flex flex-col h-[75vh] backdrop-blur-sm overflow-hidden shadow-2xl">
      <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full bg-${themeAccentColor}-500 animate-pulse`}></div>
          <span className="text-sm font-semibold text-slate-300">
            Talking with {persona === 'hitesh' ? 'Hitesh Choudhary' : 'Piyush Garg'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, index) => (
          <MessageItem key={index} message={msg} persona={persona} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-bl-none px-4 py-3 bg-slate-800 text-slate-300 border border-slate-700/50 flex items-center gap-2">
              <span className="text-xs font-semibold opacity-75">
                {persona === 'hitesh' ? 'Hitesh' : 'Piyush'} is typing
              </span>
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput 
        input={input}
        setInput={setInput}
        onSubmit={onSubmit}
        isLoading={isLoading}
        persona={persona}
      />
    </div>
  );
}
