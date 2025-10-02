import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import CountrySearch from "./components/CountrySearch";
import CountriesModal from "./components/CountriesModal.jsx";
import ComparisonTable from "./components/ComparisonTable.jsx";
import FeedbackButton from "./components/FeedbackButton";
import FeedbackModal from "./components/FeedbackModal.jsx";
import Footer from "./components/Footer.jsx";
import Popup from "./components/UI/Popup";
import { COUNTRIES, COUNTRIES_WITH_REGION } from "./lib/data";
import { MAX_COUNTRIES } from "./utils/countryUtils";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryFilterQuery, setCountryFilterQuery] = useState("");
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

  const showPopup = (msg, type = "info") =>
    setPopup({ show: true, message: msg, type });
  const closePopup = () => setPopup({ show: false, message: "", type: "info" });

  const toggleCountrySelection = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleCompare = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    if (selectedCountries.length === 0) {
      showPopup("Please select at least one country to compare.", "warning");
      return;
    }
    setComparisonCountries(selectedCountries);
  };

  const handleClear = () => {
    setIsModalOpen(false);
    setSelectedCountries([]);
    setComparisonCountries(Array(MAX_COUNTRIES).fill("Pick Country"));
  };

  const handleCountrySelect = (e, i) => {
    const newSelected = [...comparisonCountries];
    newSelected[i] = e.target.value;
    setComparisonCountries(newSelected);
  };

  return (
    <>

      <CountrySearch
        countryFilterQuery={countryFilterQuery}
        setCountryFilterQuery={setCountryFilterQuery}
        selectedCountries={selectedCountries}
        toggleCountrySelection={toggleCountrySelection}
        handleCompare={handleCompare}
        handleClear={handleClear}
        setIsModalOpen={setIsModalOpen}
        COUNTRIES={COUNTRIES}
      />
      <CountriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        countries={COUNTRIES}
        selectedCountries={selectedCountries}
        onToggleSelection={toggleCountrySelection}
        onCompare={handleCompare}
        onClear={handleClear}
      />
      <ComparisonTable
        comparisonCountries={comparisonCountries}
        countries={COUNTRIES}
        countriesWithRegion={COUNTRIES_WITH_REGION}
        onCountrySelect={handleCountrySelect}
      />
      <Popup popup={popup} onClose={closePopup} />
      <FeedbackButton setIsFeedbackOpen={setIsFeedbackOpen} />
      <FeedbackModal
        isOpen={isFeedbackOpen}
        setIsFeedbackOpen={setIsFeedbackOpen}
        feedbackForm={feedbackForm}
        setFeedbackForm={setFeedbackForm}
        showPopup={showPopup}
        COUNTRIES={COUNTRIES}
      />
    </>
  );
};

export default App;
