import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";

import ChatInput from "./components/ChatInput";
import MessageBubble from "./components/MessageBubble";
import ModelCards from "./components/ModelCards";
import ConsensusBlock from "./components/ConsensusBlock";
import { fetchConsensus } from "./services/api";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]); // array of { role, content, data? }
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  const handleSend = async () => {
    const text = prompt.trim();
    if (!text || loading) return;

    // Add user message
    setConversation((prev) => [...prev, { role: "user", content: text }]);
    setPrompt("");
    setLoading(true);

    try {
      const data = await fetchConsensus(text);

      // Add bot response with full data
      setConversation((prev) => [
        ...prev,
        {
          role: "bot",
          content: data.consensus?.response || "No consensus could be generated.",
          data,
        },
      ]);
    } catch (err) {
      setConversation((prev) => [
        ...prev,
        {
          role: "bot",
          content: `⚠️ Error: ${err.message}`,
          data: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = conversation.length === 0 && !loading;

  return (
    <div className="app">
      {/* Top bar */}
      <header className="topbar">
        <span className="topbar-title">Self-Consistency GPT</span>
      </header>

      {/* Chat area */}
      <main className="chat-area">
        <div className="chat-scroll">
          {isEmpty && (
            <div className="empty-state">
              <h1 className="empty-title">Self-Consistency GPT</h1>
              <p className="empty-sub">
                Ask anything. Your prompt will be sent to <strong>GPT-4o Mini</strong>,{" "}
                <strong>Claude 3.5 Sonnet</strong>, and <strong>Gemini 2.5 Flash</strong> simultaneously.
                <br />
                OpenAI then evaluates all three and returns one synthesised answer.
              </p>
              <div className="empty-examples">
                {[
                  "Explain the difference between concurrency and parallelism",
                  "A bat and a ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost?",
                  "Write a Python function to reverse a linked list and explain the time complexity",
                ].map((ex) => (
                  <button
                    key={ex}
                    className="example-chip"
                    onClick={() => {
                      setPrompt(ex);
                    }}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          {conversation.map((msg, i) => (
            <div key={i} className="chat-message-group">
              <MessageBubble role={msg.role} content={msg.content} />

              {/* Show model cards and consensus for bot responses */}
              {msg.role === "bot" && msg.data && (
                <div className="details-section">
                  <ModelCards responses={msg.data.responses} loading={false} />
                  <ConsensusBlock consensus={msg.data.consensus} />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="typing-indicator">
              <Loader2 size={16} className="spin" />
              <span>Querying 3 models and synthesising consensus…</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Input pinned at the bottom */}
      <ChatInput
        value={prompt}
        onChange={setPrompt}
        onSend={handleSend}
        disabled={loading}
      />
    </div>
  );
}
