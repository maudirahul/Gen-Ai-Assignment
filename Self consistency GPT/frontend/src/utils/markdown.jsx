/**
 * Lightweight markdown-to-JSX renderer.
 * Handles headings, bold, inline code, code blocks, lists, and paragraphs.
 */
export function renderMarkdown(text) {
  if (!text) return null;

  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, i) => {
    // Fenced code block
    if (part.startsWith("```")) {
      const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
      const lang = match?.[1] || "";
      const code = match?.[2] || part.slice(3, -3);
      return (
        <div key={i} className="code-block-wrapper">
          {lang && <span className="code-lang">{lang}</span>}
          <pre className="code-block">
            <code>{code.trim()}</code>
          </pre>
        </div>
      );
    }

    // Regular text — process line by line
    return part.split("\n").map((line, j) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={`${i}-${j}`} className="md-spacer" />;

      // Headings
      if (trimmed.startsWith("### "))
        return <h4 key={`${i}-${j}`} className="md-h4">{inlineFormat(trimmed.slice(4))}</h4>;
      if (trimmed.startsWith("## "))
        return <h3 key={`${i}-${j}`} className="md-h3">{inlineFormat(trimmed.slice(3))}</h3>;
      if (trimmed.startsWith("# "))
        return <h2 key={`${i}-${j}`} className="md-h2">{inlineFormat(trimmed.slice(2))}</h2>;

      // Unordered list
      if (trimmed.startsWith("- ") || trimmed.startsWith("* "))
        return <li key={`${i}-${j}`} className="md-li">{inlineFormat(trimmed.slice(2))}</li>;

      // Ordered list
      const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (olMatch)
        return <li key={`${i}-${j}`} className="md-li" value={olMatch[1]}>{inlineFormat(olMatch[2])}</li>;

      // Paragraph
      return <p key={`${i}-${j}`} className="md-p">{inlineFormat(line)}</p>;
    });
  });
}

/** Format bold and inline-code within a line. */
function inlineFormat(text) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((seg, k) => {
    if (seg.startsWith("**") && seg.endsWith("**"))
      return <strong key={k}>{seg.slice(2, -2)}</strong>;
    if (seg.startsWith("`") && seg.endsWith("`"))
      return <code key={k} className="md-inline-code">{seg.slice(1, -1)}</code>;
    return seg;
  });
}
