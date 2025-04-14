import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <div className="mb-3">
          <Link to="/" className="text-light text-decoration-none mx-3">Home</Link>
          <Link to="/news" className="text-light text-decoration-none mx-3">News</Link>
          <Link to="/chat" className="text-light text-decoration-none mx-3">Chat</Link>
          <Link to="/about" className="text-light text-decoration-none mx-3">About</Link>
        </div>
        <p className="mb-0">&copy; {new Date().getFullYear()} MyNews. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
