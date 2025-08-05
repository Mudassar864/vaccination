import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { COUNTRIES } from "./lib/data";

// Components
import Button from "./components/UI/Button";
import CountryOption from "./components/UI/CountryOption";
import Popup from "./components/UI/Popup";
import SearchBar from "./components/Search/SearchBar";
import CountriesModal from "./components/Modal/CountriesModal";
import ComparisonTable from "./components/Comparison/ComparisonTable";

// Utils
import { REGIONS, MAX_COUNTRIES, DISPLAY_COUNTRIES } from "./utils/countryUtils";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilterQuery, setCountryFilterQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [comparisonCountries, setComparisonCountries] = useState(
    Array(MAX_COUNTRIES).fill("Pick Country")
  );
  const [popup, setPopup] = useState({ show: false, message: "", type: "info" });

  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Popup functions
  const showPopup = (message, type = "info") => setPopup({ show: true, message, type });
  const closePopup = () => setPopup({ show: false, message: "", type: "info" });

  // Search functionality
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query) {
      const filtered = COUNTRIES
        .filter(country => country.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 10);
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
    setSelectedCountries(prev => {
      if (prev.includes(country)) {
        return prev.filter(c => c !== country);
      }
      
      if (prev.length >= MAX_COUNTRIES) {
        showPopup(`You can select a maximum of ${MAX_COUNTRIES} countries for comparison.`, "warning");
        return prev;
      }
      
      return [...prev, country];
    });
  };

  // Comparison handling
  const handleCompare = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    
    if (selectedCountries.length < MAX_COUNTRIES) {
      showPopup(`Please select ${MAX_COUNTRIES} countries to compare. You have selected ${selectedCountries.length}.`, "error");
      return;
    }
    
    setComparisonCountries(selectedCountries.slice(0, MAX_COUNTRIES));
    document.querySelector(".comparison-wrapper")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCountrySelect = (e, index) => {
    const newSelected = [...comparisonCountries];
    newSelected[index] = e.target.value;
    setComparisonCountries(newSelected);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter countries based on search query
  const filteredCountries = COUNTRIES.filter(country =>
    country.toLowerCase().includes(countryFilterQuery.toLowerCase())
  );

  const displayCountries = countryFilterQuery ? filteredCountries : COUNTRIES.slice(0, DISPLAY_COUNTRIES);
  const remainingCount = countryFilterQuery ? 0 : Math.max(0, COUNTRIES.length - DISPLAY_COUNTRIES);
  return (
    <>
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-left">
          <h1>Vaccination Comparison<br />Review of 2025</h1>
          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            searchRef={searchRef}
            suggestionsRef={suggestionsRef}
          />
        </div>
        <div className="banner-right">
          <img src="LADY-1.png" alt="Vaccinated Woman" />
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
            {displayCountries.map(country => (
              <CountryOption
                key={country}
                country={country}
                isSelected={selectedCountries.includes(country)}
                onClick={toggleCountrySelection}
              />
            ))}
            {remainingCount > 0 && (
              <Button onClick={() => setIsModalOpen(true)}>
                + {remainingCount} More
              </Button>
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <Button type="submit">Compare</Button>
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
      />

      {/* Selector Dropdowns */}
      <div className="selectors-grid">
        <div></div>
        {REGIONS.map((region, i) => (
          <div key={region}>
            <select
              id={`country${i + 1}`}
              value={comparisonCountries[i]}
              onChange={e => handleCountrySelect(e, i)}
            >
              <option value="Pick Country">Select Country</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <ComparisonTable comparisonCountries={comparisonCountries} />

      {/* Custom Popup */}
      <Popup popup={popup} onClose={closePopup} />
    </>
  );
};

export default App;