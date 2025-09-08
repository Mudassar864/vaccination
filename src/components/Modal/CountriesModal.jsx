import React, { useState } from "react";
import CountryOption from "../UI/CountryOption";
import Button from "../UI/Button";
import { DISPLAY_COUNTRIES } from "../../utils/countryUtils";
import { COUNTRIES_WITH_REGION } from "../../lib/data";

// Create CONTINENT_COUNTRIES mapping from COUNTRIES_WITH_REGION
const CONTINENT_COUNTRIES = COUNTRIES_WITH_REGION.reduce(
  (acc, { name, region }) => {
    if (!acc[region]) acc[region] = [];
    acc[region].push(name);
    return acc;
  },
  {}
);

const CountriesModal = ({
  isOpen,
  onClose,
  countries,
  selectedCountries,
  onToggleSelection,
  onCompare,
  onClear, // New prop to handle clearing selections
}) => {
  const [showAllContinents, setShowAllContinents] = useState(false);

  if (!isOpen) return null;

  // Get unique continents, sorted alphabetically
  const continents = [
    ...new Set(COUNTRIES_WITH_REGION.map(({ region }) => region)),
  ].sort();

  // Filter countries based on showAllContinents state
  const displayedCountries = !showAllContinents
    ? countries // Show all countries instead of slicing
    : null;

  // helper: toggle full continent selection
  const handleContinentToggle = (continent, checked) => {
    const continentCountries = CONTINENT_COUNTRIES[continent] || [];

    // Call onToggleSelection for each country individually
    continentCountries.forEach((country) => {
      const isCurrentlySelected = selectedCountries.includes(country);

      // Only toggle if the current state doesn't match desired state
      if (checked && !isCurrentlySelected) {
        onToggleSelection(country);
      } else if (!checked && isCurrentlySelected) {
        onToggleSelection(country);
      }
    });
  };

  // Handle clear action
  const handleClear = () => {
    onClear();
  };

  return (
    <div
      className="modal"
      onClick={(e) => e.target.className === "modal" && onClose()}
    >
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {/* Continent and All Countries buttons */}
        <div
          className="continent-buttons"
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
            backgroundColor: "#ebeaea",
            padding: "10px",
            borderRadius: "8px",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "max-content",
            margin: "0 auto",
            boxShadow: "0 6px 8px rgba(0,0,0,0.4)", 
            paddingInline: "20px",
          }}
        >
          <Button
            onClick={() => setShowAllContinents(false)}
            style={{
              backgroundColor: !showAllContinents ? "#d17728" : "#f0f0f0",
              color: "black",
              padding: "8px 16px",
              borderRadius: "4px",
              //border color
              border: "2px solid #d17728",
              boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            }}
          >
            All Countries
          </Button>
          <Button
            onClick={() => setShowAllContinents(true)}
            style={{
              backgroundColor: showAllContinents ? "#d17728" : "#f0f0f0",
              color: "black",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "2px solid #d17728",
              boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            }}
          >
            Continent
          </Button>
        </div>

        {/* Countries display */}
        <div>
          {showAllContinents ? (
            continents.map((continent) => {
              const continentCountries = CONTINENT_COUNTRIES[continent] || [];
              const allSelected = continentCountries.every((c) =>
                selectedCountries.includes(c)
              );
              const someSelected = continentCountries.some((c) =>
                selectedCountries.includes(c)
              );

              return (
                <div key={continent} style={{ marginBottom: "20px" }}>
                  {/* Continent with checkbox */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <h3>{continent}</h3>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = !allSelected && someSelected;
                      }}
                      onChange={(e) =>
                        handleContinentToggle(continent, e.target.checked)
                      }
                    />
                  </div>

                  {/* Countries inside this continent */}
                  <div className="modal-grid">
                    {continentCountries.map((country) => (
                      <CountryOption
                        key={country}
                        country={country}
                        isSelected={selectedCountries.includes(country)}
                        onClick={onToggleSelection}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          ) : displayedCountries && displayedCountries.length > 0 ? (
            <div className="modal-grid">
              {displayedCountries.map((country) => (
                <CountryOption
                  key={country}
                  country={country}
                  isSelected={selectedCountries.includes(country)}  
                  onClick={onToggleSelection}
                />
              ))}
            </div>
          ) : (
            <p>No countries available for this selection.</p>
          )}
        </div>
      </div>

      {/* Compare and Clear buttons */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
        }}
      >
        <Button className="button" onClick={onCompare}>Compare</Button>
        <Button className="button" onClick={handleClear}>Clear</Button>
      </div>
    </div>
  );
};

export default CountriesModal;
