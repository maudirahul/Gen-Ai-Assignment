const API_BASE = window.location.port === "5173" ? "http://localhost:5000" : "";

export async function fetchConsensus(prompt) {
  const res = await fetch(`${API_BASE}/api/consensus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${res.status}`);
  }

  return res.json();
}
