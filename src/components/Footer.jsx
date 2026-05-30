import React from 'react';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className="footer">
      
      {/* Background Glow */}
      <div className="footer-glow footer-glow-1"></div>
      <div className="footer-glow footer-glow-2"></div>

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Vivo
            <span className="footer-dot"></span>
          </Link>

          <p className="footer-description">
            Building premium digital commerce infrastructure for creators,
            entrepreneurs, modern sellers, and next-generation online businesses.
          </p>

        </div>

        {/* Links */}
        <div className="footer-column">
          <h4>Navigation</h4>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/get-started">Get Started</Link>
          </div>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4>Legal</h4>

          <div className="footer-links">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms & Conditions</a>
            <a href="/">Support</a>
          </div>
        </div>

        {/* Status */}
        <div className="footer-column">
          <h4>System Status</h4>

          <div className="footer-status">
            <span className="status-dot"></span>
            All Systems Operational
          </div>

          <p className="footer-small-text">
            Secure infrastructure optimized for modern marketplace performance.
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Vivo. All rights reserved.
        </p>

        <p>
          Next-Generation Marketplace Architecture
        </p>
      </div>

    </footer>
  );
}