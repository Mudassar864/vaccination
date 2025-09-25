import React, { useState, useEffect, useRef } from "react";
import { COUNTRIES, COUNTRIES_WITH_REGION } from "./lib/data";
import syringe from "../src/assets/vaccination/syringe.svg";
// Components
import Button from "./components/UI/Button";
import CountryOption from "./components/UI/CountryOption";
import Popup from "./components/UI/Popup";
import SearchBar from "./components/Search/SearchBar";
import CountriesModal from "./components/Modal/CountriesModal";
import ComparisonTable from "./components/Comparison/ComparisonTable";

// Utils
import {
  REGIONS,
  MAX_COUNTRIES,
  DISPLAY_COUNTRIES,
} from "./utils/countryUtils";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilterQuery, setCountryFilterQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [comparisonCountries, setComparisonCountries] = useState(
    Array(MAX_COUNTRIES).fill("Pick Country")
  );
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
    attachment: null,
  });

  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Popup functions
  const showPopup = (message, type = "info") =>
    setPopup({ show: true, message, type });
  const closePopup = () => setPopup({ show: false, message: "", type: "info" });

  // Search functionality
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = COUNTRIES.filter((country) =>
        country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (country) => {
    setSearchQuery("");
    setSuggestions([]);
    toggleCountrySelection(country);
  };

  // Country selection
  const toggleCountrySelection = (country) => {
    setSelectedCountries((prev) => {
      if (prev.includes(country)) {
        return prev.filter((c) => c !== country);
      }
      return [...prev, country];
    });
  };

  // Comparison handling
  const handleCompare = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    if (selectedCountries.length === 0) {
      showPopup("Please select at least one country to compare.", "warning");
      return;
    }

    setComparisonCountries(selectedCountries);
    document
      .querySelector(".comparison-wrapper")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Clear selections
  const handleClear = () => {
    setIsModalOpen(false);
    setSelectedCountries([]);
    setComparisonCountries(Array(MAX_COUNTRIES).fill("Pick Country"));
  };

  const handleCountrySelect = (e, index) => {
    const newSelected = [...comparisonCountries];
    newSelected[index] = e.target.value;
    setComparisonCountries(newSelected);
  };

  // Feedback form handling
  const handleFeedbackChange = (e) => {
    const { name, value, files } = e.target;
    setFeedbackForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...feedbackForm,
      attachment: feedbackForm.attachment ? feedbackForm.attachment.name : null,
    };
    console.log("Feedback submitted:", formData);
    setFeedbackForm({
      name: "",
      email: "",
      country: "",
      message: "",
      attachment: null,
    });
    setIsFeedbackOpen(false);
    showPopup("Thank you for your feedback!", "success");
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter countries based on search query
  const filteredCountries = COUNTRIES.filter((country) =>
    country.toLowerCase().includes(countryFilterQuery.toLowerCase())
  );

  const displayCountries = countryFilterQuery
    ? filteredCountries
    : COUNTRIES.slice(0, DISPLAY_COUNTRIES);
  const remainingCount = countryFilterQuery
    ? 0
    : Math.max(0, COUNTRIES.length - DISPLAY_COUNTRIES);

  return (
    <>
      {/* Banner Section */}
      <section className="banner">
        <div className="container">
          <div className="banner-left">
            <img
              style={{ width: "120px" }}
              src="./ghp-logo.png"
              alt="Logo"
              className="logo"
            />
            <h1>VACCiNATION
              <img
              src="./round.png"
              alt="round"
              className="round"
            />
            </h1>
            <span>Comparing vaccination systems globally</span>
            <img
              src={syringe}
              alt="syringe"
              className="syringe"
            />
             
          </div>
         
        </div>
      </section>

      {/* Countries Section */}
      <section className="countries-section">
        <h2>Search by Countries</h2>
        <div className="country-search-container">
          <input
            type="text"
            placeholder="Filter countries..."
            value={countryFilterQuery}
            onChange={(e) => setCountryFilterQuery(e.target.value)}
            className="country-filter-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <form id="compareForm" onSubmit={handleCompare}>
          <div className="country-grid">
            {displayCountries.map((country) => (
              <CountryOption
                key={country}
                country={country}
                isSelected={selectedCountries.includes(country)}
                onClick={toggleCountrySelection}
              />
            ))}
            {remainingCount > 0 && (
              <Button className="button" onClick={() => setIsModalOpen(true)}>
                + {remainingCount} More
              </Button>
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <Button className="button" type="submit">
              Compare
            </Button>
            <Button
              className="button"
              onClick={handleClear}
              style={{ marginLeft: "10px" }}
            >
              Clear
            </Button>
          </div>
        </form>
      </section>

      {/* Countries Modal */}
      <CountriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        countries={COUNTRIES}
        selectedCountries={selectedCountries}
        onToggleSelection={toggleCountrySelection}
        onCompare={handleCompare}
        onClear={handleClear}
      />

      {/* Comparison Table */}
      <ComparisonTable
        comparisonCountries={comparisonCountries}
        countries={COUNTRIES}
        countriesWithRegion={COUNTRIES_WITH_REGION}
        onCountrySelect={handleCountrySelect}
      />
      {/* Footer  */}

      <Footer />
      {/* Custom Popup */}
      <Popup popup={popup} onClose={closePopup} />

      {/* Feedback Button and Text */}
      <div className="feedback-container">
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="feed-icon"
        >
          <img
            src="ghp-logo.png" // Replace with your image path
            alt="Feedback"
            style={{
              width: "80%",
              height: "auto",
              padding: "5px",
            }}
          />
        </button>
        <div className="feed-text">
          <h4 style={{ textAlign: "left" }}>Any Feedback?</h4>
          <p
            style={{
              textAlign: "left",
              color: "#333",
              fontSize: "14px",
              marginBottom: "10px",
              fontWeight: "500",
            }}
          >
            Help us improve by sharing your insights.
          </p>
        </div>
      </div>

      {/* Feedback Dialog */}
      {isFeedbackOpen && (
        <div
          className="feedback-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFeedbackOpen(false);
          }}
        >
          <div className="feedback-con">
            <div className="feedback-modal">
              <span
                className="feedback-close"
                onClick={() => setIsFeedbackOpen(false)}
              >
                &times;
              </span>
              <p className="feedback-text">
                We value your feedback! This project is still in progress. If
                you have additional information or spot something we missed,
                please share it with us. Thank you.
              </p>
              <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
                <input
                  className="feedback-input"
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Name"
                />
                <input
                  className="feedback-input"
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Email"
                />
                <select
                  className="feedback-select"
                  id="country"
                  name="country"
                  required
                >
                  <option value="">Select a country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <textarea
                  className="feedback-textarea"
                  id="message"
                  name="message"
                  required
                  placeholder="Message"
                />
                <div className="feedback-buttons">
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="feedback-attachment-btn"
                    onClick={() =>
                      document.getElementById("attachment").click()
                    }
                  >
                    Attachment
                  </button>
                  <button type="submit" className="feedback-submit-btn">
                    Let's go!
                  </button>
                </div>
              </form>
              <div className="feedback-circle-top"></div>
              <div className="feedback-circle-bottom"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
