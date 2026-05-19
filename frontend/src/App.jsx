import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const processMeeting = async () => {
    if (!text.trim()) {
      alert("Please paste meeting transcript");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/process", {
        transcript: text,
      });

      console.log(res.data);

      setResult({
        summary: res.data.summary || "No summary generated",
        action_items: Array.isArray(res.data.action_items)
          ? res.data.action_items
          : [],
        decisions: Array.isArray(res.data.decisions)
          ? res.data.decisions
          : [],
      });
    } catch (err) {
      console.error(err);
      alert("Backend connection failed");
    }

    setLoading(false);
  };

  const generateEmail = async () => {
    try {
      const res = await axios.post("http://localhost:8000/followup", {
        summary: result.summary,
        action_items: result.action_items,
      });

      setEmail(res.data.email);
    } catch (err) {
      console.error(err);
      alert("Failed to generate email");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
        color: "white",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "42px" }}>
        AI Meeting Workflow Assistant
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste meeting transcript..."
        style={{
          width: "100%",
          height: "220px",
          padding: "20px",
          borderRadius: "16px",
          border: "none",
          marginTop: "20px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={processMeeting}
        style={{
          marginTop: "20px",
          padding: "14px 28px",
          background: "#38bdf8",
          color: "black",
          border: "none",
          borderRadius: "12px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Generate AI Insights"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "40px",
            background: "rgba(255,255,255,0.08)",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <h2>Summary</h2>
          <p>{result.summary}</p>

          <h2>Action Items</h2>

          {result.action_items.length > 0 ? (
            <ul>
              {result.action_items.map((item, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <b>{item.assignee || "Unknown"}</b> —{" "}
                  {item.description || "No description"}
                </li>
              ))}
            </ul>
          ) : (
            <p>No action items found</p>
          )}

          <h2>Decisions</h2>

          {result.decisions.length > 0 ? (
            <ul>
              {result.decisions.map((d, index) => (
                <li key={index}>
                  {typeof d === "string"
                    ? d
                    : d.description || JSON.stringify(d)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No decisions found</p>
          )}

          <button
            onClick={generateEmail}
            style={{
              marginTop: "20px",
              padding: "12px 22px",
              background: "#22c55e",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Generate Follow-up Email
          </button>

          {email && (
            <div
              style={{
                marginTop: "20px",
                background: "#111827",
                padding: "20px",
                borderRadius: "12px",
                whiteSpace: "pre-wrap",
              }}
            >
              {email}
            </div>
          )}
        </div>
      )}
    </div>
  );
}