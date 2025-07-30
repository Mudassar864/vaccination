import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { COUNTRIES, COUNTRY_CODES, VACCINATION_DATA } from "./lib/data";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [comparisonCountries, setComparisonCountries] = useState(
    Array(6).fill("Pick Country")
  );

  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const modalRef = useRef(null);

  const getCountryCode = (country) =>
    COUNTRY_CODES[country]?.toLowerCase() || "";
  const getFlagUrl = (country) => {
    const code = getCountryCode(country);
    return code ? `https://flagcdn.com/w40/${code}.png` : "";
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = COUNTRIES.filter((c) =>
        c.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (country) => {
    setSearchQuery("");
    setSuggestions([]);
    toggleCountrySelection(country);
  };

  // Toggle country selection
  const toggleCountrySelection = (country) => {
    setSelectedCountries((prev) => {
      if (prev.includes(country)) {
        return prev.filter((c) => c !== country);
      } else if (prev.length < 6) {
        return [...prev, country];
      } else {
        alert("You can select a maximum of 6 countries for comparison.");
        return prev;
      }
    });
  };

  // Handle compare button click
  const handleCompare = (e) => {
    e.preventDefault();
    if (selectedCountries.length < 6) {
      alert(
        `Please select 6 countries to compare. You have selected ${selectedCountries.length}.`
      );
      return;
    }
    setComparisonCountries(selectedCountries.slice(0, 6));
    const comparisonSection = document.querySelector(".comparison-wrapper");
    if (comparisonSection) {
      comparisonSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle dropdown country selection
  const handleCountrySelect = (e, index) => {
    const newSelected = [...comparisonCountries];
    newSelected[index] = e.target.value;
    setComparisonCountries(newSelected);
  };

  // Handle click outside to close suggestions and modal
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
      if (modalRef.current && e.target === modalRef.current) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const CountryOption = ({ country, isSelected, onClick }) => (
    <label className="country-option">
      <input
        type="checkbox"
        name="country"
        value={country}
        checked={isSelected}
        onChange={() => onClick(country)}
      />
      <span className="checkmark"></span>
      <img src={getFlagUrl(country)} alt={country} />
      <div>{country}</div>
    </label>
  );

  // Get data for a specific country
  const getCountryData = (country) => {
    return VACCINATION_DATA.find((data) => data.Country === country) || {};
  };

  return (
    <>
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-left">
          <h1>
            Vaccination Comparison
            <br />
            Review of 2025
          </h1>
          <div className="search-container" ref={searchRef}>
            <input
              type="text"
              id="searchCountry"
              placeholder="Search for country"
              value={searchQuery}
              onChange={handleSearch}
            />
            <span>🔍</span>
            {suggestions.length > 0 && (
              <ul id="suggestions" ref={suggestionsRef}>
                {suggestions.map((country) => (
                  <li
                    key={country}
                    onClick={() => handleSuggestionClick(country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="banner-right">
          <img src="LADY-1.png" alt="Vaccinated Woman" />
        </div>
      </section>

      {/* Countries Section */}
      <section className="countries-section">
        <h2>Search by Countries</h2>
        <form id="compareForm" onSubmit={handleCompare}>
          <div className="country-grid">
            {COUNTRIES.slice(0, 20).map((country) => (
              <CountryOption
                key={country}
                country={country}
                isSelected={selectedCountries.includes(country)}
                onClick={toggleCountrySelection}
              />
            ))}
            {COUNTRIES.length > 20 && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                style={{
                  padding: "12px 32px",
                  fontSize: "16px",
                  backgroundColor: "#0078d4",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                + {COUNTRIES.length - 20} More
              </button>
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              type="submit"
              style={{
                padding: "12px 32px",
                fontSize: "16px",
                backgroundColor: "#0078d4",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Compare
            </button>
          </div>
        </form>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h2>All Countries</h2>
            <div className="modal-grid">
              {COUNTRIES.slice(20).map((country) => (
                <CountryOption
                  key={country}
                  country={country}
                  isSelected={selectedCountries.includes(country)}
                  onClick={toggleCountrySelection}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Selector Dropdowns */}
      <div className="selectors-grid">
        <div></div>
        {[
          "Europe",
          "Africa",
          "North America",
          "South America",
          "Asia",
          "Oceania",
        ].map((region, i) => (
          <div key={i}>
            <select
              id={`country${i + 1}`}
              value={comparisonCountries[i]}
              onChange={(e) => handleCountrySelect(e, i)}
            >
              <option value="Pick Country">Select Country ({region})</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="comparison-wrapper">
        <div className="comparison-table" id="comparisonTable">
          <div className="table-header">Info</div>
          {comparisonCountries.map((country, i) => (
            <div key={i} className="table-header" id={`c${i + 1}Name`}>
              {country === "Pick Country"
                ? `Select Country (${
                    [
                      "Europe",
                      "Africa",
                      "North America",
                      "South America",
                      "Asia",
                      "Oceania",
                    ][i]
                  })`
                : country}
            </div>
          ))}

          <div className="label-cell">Flag</div>
          {comparisonCountries.map((country, i) => (
            <div key={i} className="table-cell" id={`c${i + 1}Flag`}>
              {country !== "Pick Country" && getFlagUrl(country) ? (
                <img src={getFlagUrl(country)} alt={country} />
              ) : (
                "--"
              )}
            </div>
          ))}

          {["Goals", "Plan", "Implementation", "Evaluation"].map((label) => (
            <React.Fragment key={label}>
              <div className="label-cell">{label}</div>
              {comparisonCountries.map((country, i) => {
                const countryData = getCountryData(country);
                const aKey = `${label} a`;
                const bKey = `${label} b`;

                const getBoxClass = (value) => {
                  if (value === "No") return "value-box red";
                  return "value-box green";
                };

                const formatValue = (value) => {
                  if (!value) return "--";
                  return value === "No" ? "No" : "Yes";
                };

                return (
                  <div key={i} className="table-cell" id={`c${i + 1}${label}`}>
                    {country !== "Pick Country" ? (
                      <div className="ab-box">
                        <span className={getBoxClass(countryData[aKey])}>
                          A: {formatValue(countryData[aKey])}
                        </span>
                        <span className={getBoxClass(countryData[bKey])}>
                          B: {formatValue(countryData[bKey])}
                        </span>
                      </div>
                    ) : (
                      "--"
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
