import { User, Bot } from "lucide-react";
import { renderMarkdown } from "../utils/markdown";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`msg-row ${isUser ? "msg-user" : "msg-bot"}`}>
      <div className="msg-avatar">
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>
      <div className="msg-body">
        <span className="msg-role">{isUser ? "You" : "Self-Consistency GPT"}</span>
        <div className="msg-content">
          {isUser ? <p>{content}</p> : renderMarkdown(content)}
        </div>
      </div>
    </div>
  );
}
