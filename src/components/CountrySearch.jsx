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
  COUNTRIES,
}) => {
  const [showByContinent, setShowByContinent] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);

  // Group countries by region
  const CONTINENT_COUNTRIES = COUNTRIES_WITH_REGION.reduce((acc, { name, region }) => {
    if (!acc[region]) acc[region] = [];
    acc[region].push(name);
    return acc;
  }, {});
  const continents = Object.keys(CONTINENT_COUNTRIES);

  // Filter countries
  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countryFilterQuery.toLowerCase())
  );
  const displayCountries = countryFilterQuery ? filteredCountries : COUNTRIES;
  const countriesToShow = showAllCountries ? displayCountries : displayCountries.slice(0, 20);
  const remainingCount = displayCountries.length - 20;

  // Handle continent select/deselect all
  const handleContinentToggle = (continentCountriesList, checked) => {
    continentCountriesList.forEach((country) => {
      const isSelected = selectedCountries.includes(country);
      if (checked && !isSelected) toggleCountrySelection(country);
      else if (!checked && isSelected) toggleCountrySelection(country);
    });
  };

  return (
    <section className="bg-[#f4f6fc] py-6 sm:py-10 px-4 sm:px-5 text-center">
      {/* Toggle Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mb-5 flex-wrap justify-center items-center max-w-max mx-auto">
        {/* All Countries Button */}
        <button
          onClick={() => {
            setShowByContinent(false);
            setShowAllCountries(true);
            setCountryFilterQuery(""); // reset search
          }}
          className={`px-4 py-2 text-xl rounded border-2 border-[#d17728] shadow-md transition-colors duration-300 ${
            !showByContinent
              ? "bg-[#d17728] text-white"
              : "bg-gray-100 text-black hover:bg-[#ffe9d5]"
          }`}
        >
          Search by Country
        </button>

        {/* Continents Button */}
        <button
          onClick={() => {
            setShowByContinent(true);
            setShowAllCountries(false);
            setCountryFilterQuery(""); // reset search
          }}
          className={`px-4 py-2 text-xl rounded border-2 border-[#d17728] shadow-md transition-colors duration-300 ${
            showByContinent
              ? "bg-[#d17728] text-white"
              : "bg-gray-100 text-black hover:bg-[#ffe9d5]"
          }`}
        >
          Search by Continent
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-[700px] mx-auto mb-7 w-full">
        <input
          type="text"
          placeholder={`Search ${showByContinent ? "countries by continent" : "countries"}...`}
          value={countryFilterQuery}
          onChange={(e) => setCountryFilterQuery(e.target.value)}
          className="w-full py-3 pr-11 pl-4 text-base border-2 border-[#e1e5e9] rounded-xl bg-white transition-all focus:outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(0,120,212,0.1)]"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-gray-600 pointer-events-none">
          🔍
        </span>
      </div>

      {/* Country/Continent Display */}
      <form onSubmit={handleCompare}>
        {!showByContinent ? (
          <>
            {/* All Countries View */}
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
                  <Button
                    type="button"
                    onClick={() => setShowAllCountries(true)}
                    className="bg-[#d17728] h-full text-white hover:bg-[#b96420] transition rounded-lg px-3 py-2"
                  >
                    +{remainingCount} countries
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Continents View */}
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
                <div key={continent} className="mb-6 sm:mb-8 max-w-7xl mx-auto">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      {continent}
                    </h3>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = !allSelected && someSelected;
                      }}
                      onChange={(e) =>
                        handleContinentToggle(filteredContinentCountries, e.target.checked)
                      }
                      className="w-5 h-5 accent-[#d17728] cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 sm:gap-5 pt-4 sm:pt-8 max-w-7xl mx-auto px-2">
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
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">
          <Button
            type="submit"
            className="bg-[#d17728] text-white hover:bg-[#b96420] px-5 py-2 rounded-lg shadow-md"
          >
            Compare
          </Button>
          <Button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 text-black hover:bg-gray-400 px-5 py-2 rounded-lg shadow-md"
          >
            Clear
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CountrySearch;
