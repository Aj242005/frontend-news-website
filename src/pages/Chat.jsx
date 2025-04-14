import React, { useState, useEffect } from "react";
import "../assets/style/Chat.css";
import { FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const backendUrl = "https://backend-main-news-website.onrender.com";

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Replace dummy response with backend API integration:
    fetch(`${backendUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    })
      .then((res) => res.json())
      .then((data) => {
        const aiResponse = { text: data.response || "No response from API", sender: "ai" };
        setMessages((prev) => [...prev, aiResponse]);
      })
      .catch((err) => {
        console.error(err);
        const errorResponse = { text: "Error fetching response", sender: "ai" };
        setMessages((prev) => [...prev, errorResponse]);
      });
  };

  return (
    <div className="container my-5 chat-container">
      <h2 className="mb-4 text-center">🤖 Chat with AI</h2>

      <div className="card shadow-sm chat-box">
        <div className="card-body message-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-bubble ${msg.sender === "user" ? "user-msg" : "ai-msg"}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="card-footer d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Ask me anything about semiconductors..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="btn btn-primary" onClick={handleSend}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
