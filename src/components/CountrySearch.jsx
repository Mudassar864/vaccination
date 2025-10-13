import React, { useState } from "react";
import CountryOption from "./UI/CountryOption";
import Button from "./UI/Button";
import { COUNTRIES_WITH_REGION } from "../lib/data";

const CountrySearch = ({
  countryFilterQuery,
  setCountryFilterQuery,
  selectedCountries,
  toggleCountrySelection,
  handleCompare,
  handleClear,
  COUNTRIES
}) => {
  const [showByContinent, setShowByContinent] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);

  // Create CONTINENT_COUNTRIES mapping from COUNTRIES_WITH_REGION
  const CONTINENT_COUNTRIES = COUNTRIES_WITH_REGION.reduce(
    (acc, { name, region }) => {
      if (!acc[region]) acc[region] = [];
      acc[region].push(name);
      return acc;
    },
    {}
  );

  // Get unique continents
  const continents = [
    ...new Set(COUNTRIES_WITH_REGION.map(({ region }) => region)),
  ];

  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countryFilterQuery.toLowerCase())
  );

  const displayCountries = countryFilterQuery
    ? filteredCountries
    : COUNTRIES;

  const countriesToShow = showAllCountries
    ? displayCountries
    : displayCountries.slice(0, 20);

  const remainingCount = displayCountries.length - 20;

  // helper: toggle filtered continent selection
  const handleContinentToggle = (continentCountriesList, checked) => {
    continentCountriesList.forEach((country) => {
      const isCurrentlySelected = selectedCountries.includes(country);

      // Only toggle if the current state doesn't match desired state
      if (checked && !isCurrentlySelected) {
        toggleCountrySelection(country);
      } else if (!checked && isCurrentlySelected) {
        toggleCountrySelection(country);
      }
    });
  };

  return (
    <section className="bg-[#f4f6fc] py-6 sm:py-10 px-4 sm:px-5 text-center ">
      <div className="flex flex-col sm:flex-row gap-2 mb-5 flex-wrap bg-gray-100 p-2 rounded-lg justify-center items-center max-w-max mx-auto shadow-[0_6px_8px_rgba(0,0,0,0.4)] px-3 sm:px-5">
        <Button
          onClick={() => {
            setShowByContinent(false);
            setShowAllCountries(false);
          }}
          style={{
            backgroundColor: !showByContinent ? "#d17728" : "#f0f0f0",
            color: "black",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "2px solid #d17728",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          }}
        >
          All Countries
        </Button>
        <Button
          onClick={() => setShowByContinent(true)}
          style={{
            backgroundColor: showByContinent ? "#d17728" : "#f0f0f0",
            color: "black",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "2px solid #d17728",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          }}
        >
          Continents
        </Button>
      </div>

      <div className="relative max-w-[400px] mx-auto mb-7 w-full">
        <input
          type="text"
          placeholder="Filter countries..."
          value={countryFilterQuery}
          onChange={(e) => setCountryFilterQuery(e.target.value)}
          className="w-full py-3 pr-11 pl-4 text-base border-2 border-[#e1e5e9] rounded-xl bg-white transition-all focus:outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(0,120,212,0.1)]"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-gray-600 pointer-events-none">🔍</span>
      </div>

      <form onSubmit={handleCompare}>
        {showByContinent ? (
          <>
            {continents.map((continent) => {
              const continentCountries = CONTINENT_COUNTRIES[continent] || [];
              const filteredContinentCountries = countryFilterQuery
                ? continentCountries.filter((c) =>
                    c.toLowerCase().includes(countryFilterQuery.toLowerCase())
                  )
                : continentCountries;

              if (filteredContinentCountries.length === 0) return null;

              const allSelected = filteredContinentCountries.every((c) =>
                selectedCountries.includes(c)
              );
              const someSelected = filteredContinentCountries.some((c) =>
                selectedCountries.includes(c)
              );

              return (
                <div key={continent} className="mb-4 sm:mb-5 max-w-7xl mx-auto">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-medium">{continent}</h3>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = !allSelected && someSelected;
                      }}
                      onChange={(e) =>
                        handleContinentToggle(filteredContinentCountries, e.target.checked)
                      }
                      className="w-5 h-5"
                    />
                  </div>

                  <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 sm:gap-5 pt-4 sm:pt-10 max-w-7xl mx-auto px-2">
                    {filteredContinentCountries.map((country) => (
                      <CountryOption
                        key={country}
                        country={country}
                        isSelected={selectedCountries.includes(country)}
                        onClick={toggleCountrySelection}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 sm:gap-5 max-w-7xl mx-auto px-2">
              {countriesToShow.map((country) => (
                <CountryOption
                  key={country}
                  country={country}
                  isSelected={selectedCountries.includes(country)}
                  onClick={toggleCountrySelection}
                />
              ))}
              {!showAllCountries && displayCountries.length > 20 && (
              <div className="text-center">
                <Button className="h-full" onClick={() => setShowAllCountries(true)}>
                  +{remainingCount} countries
                </Button>
              </div>
            )}
            </div>
            
          </>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mt-7">
          <Button type="submit">Compare</Button>
          <Button onClick={handleClear}>Clear</Button>
        </div>
      </form>
    </section>
  );
};

export default CountrySearch;