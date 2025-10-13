import React, { useState } from "react";
import CountryOption from "./UI/CountryOption";
import Button from "./UI/Button";
import { DISPLAY_COUNTRIES } from "../utils/countryUtils";
import { COUNTRIES_WITH_REGION } from "../lib/data";

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
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000] p-5"
      onClick={(e) => e.target.className.includes("fixed") && onClose()}
    >
      <div className="bg-white p-5 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <span
          className="absolute top-2 right-4 text-3xl font-bold text-gray-400 cursor-pointer z-10 hover:text-black"
          onClick={onClose}
        >
          &times;
        </span>

        <div className="flex gap-2 mb-5 flex-wrap bg-gray-100 p-2 rounded-lg justify-center items-center max-w-max mx-auto shadow-[0_6px_8px_rgba(0,0,0,0.4)] px-5">
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
                <div key={continent} className="mb-5">
                  <div className="flex items-center gap-2">
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
                      className="w-5 h-5"
                    />
                  </div>

                  <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 pt-10">
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
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 pt-10">
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

      <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 flex gap-2">
        <Button className="button" onClick={onCompare}>Compare</Button>
        <Button className="button" onClick={handleClear}>Clear</Button>
      </div>
    </div>
  );
};

export default CountriesModal;
