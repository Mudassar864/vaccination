import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "./pages/NotFound.jsx";
import Terms from "./pages/Terms.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Footer from "./components/Footer.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Disclaimer from "./pages/disclaimer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Imprint from "./pages/imprint.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HeroSection />
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-conditions" element={<Terms />} />
      <Route path="/imprint" element={<Imprint />} />
      <Route path="*" element={<NotFound />} /> {/* 👈 catch-all 404 */}
    </Routes>
    <Footer />
  </BrowserRouter>
);
