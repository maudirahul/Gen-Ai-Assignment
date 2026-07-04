import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

function App() {
  const [selectedPersona, setSelectedPersona] = useState('hitesh');
  
  const [hiteshMessages, setHiteshMessages] = useState([
    { role: 'assistant', content: 'Haann jii, back again with another discussion! Ek cup chai le lo aur shuru karte hain. Kya seekhna hai aaj?' }
  ]);
  const [piyushMessages, setPiyushMessages] = useState([
    { role: 'assistant', content: 'Hey everyone, Piyush here. Aaj kya build kar rahe ho? Let\'s discuss systems architecture under the hood.' }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const activeMessages = selectedPersona === 'hitesh' ? hiteshMessages : piyushMessages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [hiteshMessages, piyushMessages, selectedPersona]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    
    if (selectedPersona === 'hitesh') {
      setHiteshMessages(prev => [...prev, userMessage]);
    } else {
      setPiyushMessages(prev => [...prev, userMessage]);
    }
    
    setInput('');
    setIsLoading(true);

    const currentHistory = selectedPersona === 'hitesh' ? hiteshMessages : piyushMessages;
    const updatedMessages = [...currentHistory, userMessage];

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        messages: updatedMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        persona: selectedPersona
      });

      const assistantReply = typeof response.data === 'string'
        ? response.data
        : response.data?.choices?.[0]?.message?.content || 
          response.data?.choices?.[0]?.message || 
          "No response received from the model.";

      const botReply = { role: 'assistant', content: assistantReply };
      
      if (selectedPersona === 'hitesh') {
        setHiteshMessages(prev => [...prev, botReply]);
      } else {
        setPiyushMessages(prev => [...prev, botReply]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      const errMsg = err.response?.data?.message || err.response?.data?.error || `Failed to connect to ${selectedPersona === 'hitesh' ? 'Hitesh' : 'Piyush'}.`;
      
      const errorReply = { 
        role: 'assistant', 
        content: `Error: ${errMsg}` 
      };

      if (selectedPersona === 'hitesh') {
        setHiteshMessages(prev => [...prev, errorReply]);
      } else {
        setPiyushMessages(prev => [...prev, errorReply]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      <Header selectedPersona={selectedPersona} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Sidebar 
          selectedPersona={selectedPersona}
          setSelectedPersona={setSelectedPersona}
        />

        <ChatWindow 
          messages={activeMessages}
          isLoading={isLoading}
          persona={selectedPersona}
          messagesEndRef={messagesEndRef}
          input={input}
          setInput={setInput}
          onSubmit={handleSend}
        />
      </main>
    </div>
  );
}

export default App;
