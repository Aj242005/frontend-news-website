import React, { useState, useEffect, useRef } from "react";
import "../assets/style/Chat.css";
import { FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Build conversation history as a string.
  const conversationHistory = messages
    .map((msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`)
    .join("\n");

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, conversationHistory }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = { text: data.response || "No response received.", sender: "ai" };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error("Error fetching chat response:", err);
      const errorResponse = {
        text: `Failed to get a response. Please try again later. Error: ${err.message}`,
        sender: "ai"
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5 chat-container">
      <h2 className="mb-4 text-center">🤖 Chat with AI</h2>
      <div className="card shadow-sm chat-box">
        <div className="card-body message-area">
          {messages.length === 0 ? (
            <div className="text-center text-muted p-4">
              Send a message to start a conversation!
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`message-bubble ${msg.sender === "user" ? "user-msg" : "ai-msg"}`}>
                {msg.text}
              </div>
            ))
          )}
          {isLoading && (
            <div className="message-bubble ai-msg">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="card-footer d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Ask me anything about semiconductors..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <button
            className="btn btn-primary"
            onClick={handleSend}
            disabled={isLoading || input.trim() === ""}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;