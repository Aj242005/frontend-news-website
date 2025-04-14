import React from "react";
import logo from "../assets/MyNewsLogo.png";

const About = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <img src={logo} alt="Site Logo" className="mb-3" style={{ width: "120px" }} />
        <h2 className="fw-bold">About MyNews</h2>
        <p className="text-muted w-75 mx-auto">
          Welcome to <strong>MyNews</strong> – your trusted hub for breaking news, deep tech insights, and expert commentary in the world of chips, silicon, and cutting-edge nanotech. ⚡
        </p>
      </div>

      <div className="mb-5 text-center">
        <h4 className="fw-semibold mb-3">📰 What We Do</h4>
        <ul className="list-unstyled">
          <li>🔍 Curate top semiconductor headlines from around the world</li>
          <li>🧪 Break down innovations in chip architecture & AI hardware</li>
          <li>📊 Deliver insightful analysis on market trends & research</li>
          <li>🤖 Integrate AI tools to let you chat with tech-powered insights</li>
        </ul>
      </div>

      <div className="mb-5 text-center">
        <h4 className="fw-semibold mb-3">👨‍💻 Creator</h4>
        <p>
          Built by <strong>Akshit and Vishal</strong>, passionate developers exploring the world of semiconductors, web tech, and AI. This platform was created as a modern solution to deliver real-time chip
          industry updates, enriched by clean UI/UX and smart tech.
        </p>
      </div>
    </div>
  );
};

export default About;
