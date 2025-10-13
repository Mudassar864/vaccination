import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 text-center p-5 text-sm leading-relaxed py-10">
      <div className="flex items-center justify-center gap-2">
        <div className="text-lg font-bold mb-2 flex justify-center items-center gap-0.5">
          <Link to="/" >
            <img src="/ghp-logo.png" alt="Logo" className="h-[100px] mr-2" />
          </Link>
        </div>

        <div>
          <div className="my-2">
            <Link to="/terms-conditions" className="text-gray-300 no-underline mx-1 hover:text-[#e67e22]">Terms & Conditions</Link> |
            <Link to="/privacy-policy" className="text-gray-300 no-underline mx-1 hover:text-[#e67e22]">Privacy Policy</Link> |
            <Link to="/disclaimer" className="text-gray-300 no-underline mx-1 hover:text-[#e67e22]">Disclaimer</Link> |
            <Link to="/imprint" className="text-gray-300 no-underline mx-1 hover:text-[#e67e22]">Imprint</Link> |
            <Link to="https://id-ea.org/contact-us/" className="text-gray-300 no-underline mx-1 hover:text-[#e67e22]">Contacts</Link> |
            <Link to="https://id-ea.org/contact-us/" className="text-gray-300 no-underline mx-1 hover:text-[#e67e22]">LinkedIn</Link>
          </div>

          <div className="my-2 text-gray-400">
            Copyright © 2009 - {new Date().getFullYear()} Global Health Press Pte Ltd. Reg. No.
            200921795N All Rights Reserved.
          </div>

          <div>
            Subject to <a href="#" className="text-[#4da6ff] no-underline hover:underline">Creative Commons Licence (cc)</a>.
          </div>
        </div>
      </div>
    </footer>
  );
}
