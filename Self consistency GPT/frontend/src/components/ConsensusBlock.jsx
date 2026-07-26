import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { renderMarkdown } from "../utils/markdown";

export default function ConsensusBlock({ consensus }) {
  const [showReasoning, setShowReasoning] = useState(false);

  if (!consensus) return null;

  return (
    <div className="consensus-block">
      {/* Main synthesised answer */}
      <div className="consensus-body">
        {renderMarkdown(consensus.response)}
      </div>

      {/* Toggle for reasoning */}
      {consensus.reasoning && (
        <div className="reasoning-section">
          <button
            className="reasoning-toggle"
            onClick={() => setShowReasoning(!showReasoning)}
          >
            <Sparkles size={14} />
            <span>Evaluation reasoning</span>
            {showReasoning ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {showReasoning && (
            <div className="reasoning-content">
              {renderMarkdown(consensus.reasoning)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
