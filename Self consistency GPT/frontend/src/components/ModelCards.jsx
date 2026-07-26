import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const MODEL_META = {
  "openai/gpt-4o-mini":        { short: "GPT-4o Mini",        color: "#10a37f" },
  "anthropic/claude-sonnet-4": { short: "Claude Sonnet 4", color: "#f59e0b" },
  "google/gemini-2.5-flash":    { short: "Gemini 2.5 Flash",  color: "#3b82f6" },
};

function getMeta(slug) {
  for (const [key, val] of Object.entries(MODEL_META)) {
    if (slug.includes(key) || key.includes(slug)) return val;
  }
  return { short: slug, color: "#9ca3af" };
}

export default function ModelCards({ responses, loading }) {
  if (loading) {
    return (
      <div className="model-cards">
        {Object.values(MODEL_META).map((m) => (
          <div key={m.short} className="model-card" style={{ borderTopColor: m.color }}>
            <div className="mc-header">
              <span className="mc-name">{m.short}</span>
              <Loader2 size={14} className="mc-spinner" />
            </div>
            <div className="mc-body">
              <div className="skeleton-line w75" />
              <div className="skeleton-line w100" />
              <div className="skeleton-line w60" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!responses) return null;

  return (
    <div className="model-cards">
      {responses.map((r) => {
        const meta = getMeta(r.model);
        return (
          <div key={r.model} className="model-card" style={{ borderTopColor: meta.color }}>
            <div className="mc-header">
              <span className="mc-name">{meta.short}</span>
              {r.success ? (
                <CheckCircle size={14} className="mc-ok" />
              ) : (
                <XCircle size={14} className="mc-fail" />
              )}
            </div>
            <div className="mc-body">
              <p className="mc-text">{r.response}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
