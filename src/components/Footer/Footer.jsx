import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <img src="/ghp-logo.png" alt="Logo" />
        </div>

        <div>
          <div className="footer-links">
            <a href="#">Terms & Conditions</a> |<a href="#">Privacy Policy</a> |
            <a href="#">Disclaimer</a> |<a href="#">Imprint</a> |
            <a href="#">Contacts</a> |<a href="#">LinkedIn</a>
          </div>

          <div className="footer-copy">
            Copyright © 2009–2025 Global Health Press Pte Ltd. Reg. No.
            200921795N All Rights Reserved.
          </div>

          <div className="footer-license">
            Subject to <a href="#">Creative Commons Licence (cc)</a>.
          </div>
        </div>
      </div>
    </footer>
  );
}
