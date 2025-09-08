import React, { useState, useEffect, useRef } from "react";
import { COUNTRIES, COUNTRIES_WITH_REGION } from "./lib/data";

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
            <img style={{width:"120px"}} src="ghp-logo.png" alt="Logo" className="logo" />
            <h1>VACCiNATION</h1>
            <span>Comparing vaccination systems globally</span>
          </div>
          <div className="banner-right">
            <img src="LADY-1.png" alt="Vaccinated Woman" />
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
      <div
        style={{
          position: "fixed",
          bottom: "70px",
          right: "20px",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setIsFeedbackOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#d17728",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s",
            position: "relative",
            zIndex: 1001,
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#d17728")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#f18322ff")
          }
        >
          <img
            src="feedback-icon.png" // Replace with your image path
            alt="Feedback"
            style={{
              width: "30px",
              height: "30px",
            }}
          />
        </button>
        <div
          style={{
            position: "absolute",
            left: "-400%",
            bottom: "-40px",
            backgroundColor: "#f5ac57",
            padding: "10px",
            borderRadius: "8px",
            zIndex: 10,
          }}
        >
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
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFeedbackOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: "#f3eae3",
              padding: "20px",
              borderRadius: "15px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                fontSize: "24px",
                cursor: "pointer",
                color: "#333",
              }}
              onClick={() => setIsFeedbackOpen(false)}
            >
              &times;
            </span>
            <p
              style={{
                fontSize: "14px",
                color: "#333",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              We value your feedback! This project is still in progress. If you
              have additional information or spot something we missed, please
              share it with us. Thank you.
            </p>
            <form
              onSubmit={handleFeedbackSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={feedbackForm.name}
                onChange={handleFeedbackChange}
                required
                placeholder="Name"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                }}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={feedbackForm.email}
                onChange={handleFeedbackChange}
                required
                placeholder="Email"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                }}
              />
              <select
                id="country"
                name="country"
                value={feedbackForm.country}
                onChange={handleFeedbackChange}
                required
                placeholder="Country"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                }}
              >
                <option value="">Select a country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <textarea
                id="message"
                name="message"
                value={feedbackForm.message}
                onChange={handleFeedbackChange}
                required
                placeholder="Message"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  minHeight: "100px",
                  resize: "vertical",
                }}
              />
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleFeedbackChange}
                  style={{
                    display: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("attachment").click()}
                  style={{
                    backgroundColor: "#D4A373",
                    border: "none",
                    maxWidth: "max-content",

                    padding: "10px 20px",
                    color: "#fff",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Attachment
                </button>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#D4A373",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Let's go!
                </Button>
              </div>
            </form>
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "100px",
                height: "100px",
                backgroundColor: "#D4A373",
                borderRadius: "50%",
                zIndex: -1,
                opacity: 0.5,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                width: "80px",
                height: "80px",
                backgroundColor: "#D4A373",
                borderRadius: "50%",
                zIndex: -1,
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      )}


    </>
  );
};

export default App;
