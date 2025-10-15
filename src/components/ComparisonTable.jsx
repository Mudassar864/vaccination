import React, { useState, useMemo } from "react";
import Select from "react-select";
import {
  getCountryData,
  EVALUATION_CATEGORIES,
  REGIONS,
} from "../utils/countryUtils";
import { Link } from "react-router-dom";

const ComparisonTable = ({
  comparisonCountries,
  countriesWithRegion,
  onCountrySelect,
}) => {
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const initial = {};
    [
      ...EVALUATION_CATEGORIES,
      "VaccinationSystem",
      "HCP_Providers",
      "Healthcare",
      "Country",
      "Politics",
      "Education",
      "Population",
      "Others",
    ].forEach((cat) => (initial[cat] = true));
    return initial;
  });

  const toggleCategory = (category) =>
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));

  // ✅ UPDATED FUNCTION: group countries by region and reorder dynamically based on current country or default region
  const getOptionsWithRegionFirst = (currentCountry, defaultRegion) => {
    if (!countriesWithRegion || countriesWithRegion.length === 0) return [];

    // Build grouped list once
    const grouped = REGIONS.reduce((acc, region) => {
      const countries = countriesWithRegion.filter((c) => c.region === region);
      if (countries.length > 0) {
        acc.push({
          label: region,
          options: countries.map((c) => ({
            value: c.name,
            label: `${c.name}`,
          })),
        });
      }
      return acc;
    }, []);

    // Determine the region to put first
    let firstRegion;
    if (currentCountry && currentCountry !== "Pick Country") {
      firstRegion = countriesWithRegion.find(
        (c) => c.name === currentCountry
      )?.region;
    } else {
      firstRegion = defaultRegion;
    }

    if (!firstRegion) return grouped;

    // Move that region to the top
    const reordered = [
      ...grouped.filter((g) => g.label === firstRegion),
      ...grouped.filter((g) => g.label !== firstRegion),
    ];

    return reordered;
  };

  const QUESTIONS = {
    Goals: [
      "A. Have Future Vaccine needs been identified (e.g., for the next 3, 5 or 10 years)?",
      "B. Is there ≥1 specific, officially published and well-known national vaccination target to be reached by a specific date (e.g., measles elimination by end 2026)?",
    ],
    Plan: [
      "A. Is there one (and only one) vaccination plan covering all ages published by a WHO-type NITAG",
      "B. Are upcoming Vaccine candidates reviewed annually (pre-licensure) by NITAG (“horizon scanning”)?",
    ],
    Implementation: [
      "A. Are there clearly defined responsibilities and accountabilities for implementation of the NITAG plan PLUS action implementation in case of failures in case of failure?",
      "B. Is the NITAG plan regularly supported by government-funded national information campaigns (e.g. (social) media advertisements, TV spots)",
    ],
    Evaluation: [
      "A. Are there up to date (> every 2 years) validated and published studies on vaccine-uptake, completion and compliance at age 2 years, before school entry, for adolescents and for those ≥65 (some countries: ≥60) years?",
      "B. Are there scientifically sound and timely (≤2 years) burden-of-disease data by age group on all vaccine-preventable diseases and also on relevant pipeline vaccines in phase 3?",
    ],
    VaccinationSystem: [
      "Does COUNTRY have a national vaccine licensing authority? Name and link",
      "Does this authority conduct adverse event surveillance?",
      "How is the vaccine market organized?",
      "Source",
    ],
    HCP_Providers: [
      "Number of medical doctors",
      "Year",
      "Source link",
      "Number of general practitioners",
      "Source (GPs)",
      "Number of hospital physicians",
      "Source",
      "Number of gynecologists",
      "Number of pediatricians",
      "Source",
      "Cost-free well-baby visits?",
      "Medical schools / university hospitals",
      "Source",
    ],
    Healthcare: [
      "Describe In the few words the healthcare system in the country",
      "what type of healthcare insurance is exist and what percentage of the population are covered by insurance",
      "Is there regular and continuous, scientifically sound surveillance for all current and future vaccine preventable diseases",
      "is there mandatory reporting for selected infectious diseases",
      "Source",
    ],
    Country: [
      "What is the average monthly income in the country?",
      "What are the main sources of income for the nation?",
      "What is the GNP slash B IP in the country?",
      "Source",
      "What is the total spending for health care in the country?",
      "What is the unemployment rate in the country?",
      "what is the percentage of females in the working force?",
      "Source",
    ],
    Politics: [
      "Describe the political system in a few sentences?",
      "what are the main political institutions that govern the country?",
      "Source",
    ],
    Education: [
      "Describe briefly the educational system of the country and the relevant final jb titles or academic degrees achievable in the country",
      "Source",
    ],
    Population: [
      "What is the size of the population?",
      "What is the size of the birth cohort?",
      "What is the number of subjects 18 to 64 years old?",
      "What is the number of subjects 65 years of age or older?",
    ],
    Others: [
      "Which languages are officially spoken in the country?",
      "what is the capital of the country?",
      "what is the size of the country in square kilometers?",
      "what is the population density Population Density (people/sq km)?",
      "Describe the climate of the country in a few sentences?",
    ],
  };

  /** ✅ Render YES/NO logic with links */
  const renderYesNoAnswer = (country, category, index) => {
    if (!country || country === "Pick Country" || country === "--") return "--";
    const data = getCountryData(country);
    if (!data) return "--";

    const key = index === 0 ? `${category} a` : `${category} b`;
    const val = data[key];
    const isYes = val && val !== "No";

    return (
      <span
        className={`inline-block p-5 rounded text-xs font-bold text-center min-w-[40px]  ${
          isYes ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isYes ? (
          <a href={val} target="_blank" rel="noopener noreferrer">
            YES
          </a>
        ) : (
          "NO"
        )}
      </span>
    );
  };

  /** ✅ Generic renderer for q/h prefixed data */
  const renderGenericAnswer = (country, prefix, index) => {
    if (!country || country === "Pick Country" || country === "--") return "--";
    const data = getCountryData(country);
    if (!data) return "--";

    const key = `${prefix}${index + 1}`;
    const val = data[key];

    if (val === null || val === undefined || val === "No" || val === "")
      return "--";

    if (Array.isArray(val)) {
      return val.map((item, i) => (
        <div key={i}>
          {typeof item === "string" && item.startsWith("http") ? (
            <a
              href={item}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Available
            </a>
          ) : (
            String(item)
          )}
        </div>
      ));
    }

    if (typeof val === "string") {
      if (val.startsWith("http")) {
        return (
          <a
            href={val}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Available
          </a>
        );
      }
      return val;
    }

    return String(val);
  };

  const calcScore = (country) => {
    if (!country || country === "Pick Country" || country === "--") return "--";
    const data = getCountryData(country);
    if (!data) return "--";

    const yesCount = EVALUATION_CATEGORIES.reduce((count, cat) => {
      ["a", "b"].forEach((s) => {
        const key = `${cat} ${s}`;
        if (data[key] && data[key] !== "No") count++;
      });
      return count;
    }, 0);

    return <span className="font-bold text-lg">{yesCount}/8</span>;
  };

  let displayCountries = [...comparisonCountries];
  while (displayCountries.length < 5) {
    displayCountries.push("Pick Country");
  }

  const num = displayCountries.length;
  const width = 200 + num * 250;
  const colWidth = "250px";

  const renderGenericSection = (title, prefix) => (
    <>
      <tr>
        <td
          className="font-bold bg-primary text-white cursor-pointer p-4 sticky left-0 z-[3] rounded-lg overflow-hidden"
          onClick={() => toggleCategory(title)}
        >
          <span
            className={`mr-2 inline-block transition-transform ${
              expandedCategories[title] ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
          {title.replaceAll("_", " ")}
        </td>
        {displayCountries.map((_, i) => (
          <td key={i}></td>
        ))}
      </tr>

      {expandedCategories[title] &&
        QUESTIONS[title].map((q, qi) => (
          <tr key={`${title}-${qi}`}>
            <td className="p-4 bg-white shadow rounded-lg sticky left-0 z-[3] text-left first-letter-cap">
              {q}
            </td>
            {displayCountries.map((country, i) => (
              <td key={i} className="p-4 bg-white shadow rounded-lg text-left">
                {renderGenericAnswer(country, prefix, qi)}
              </td>
            ))}
          </tr>
        ))}
    </>
  );

  return (
    <div className="comparison-wrapper text-center py-10 px-5 bg-gray-50 min-h-[60vh]">
      <div
        className="w-full max-w-[1480px] mx-auto rounded-lg shadow-sm bg-white"
        style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "75vh", // 👈 Adjust as needed
        }}
      >
        <table
          style={{ width: `${width}px`, minWidth: "100%" }}
          className="border-separate border-spacing-2 my-5 font-sans"
        >
          <thead className="sticky top-0 z-20 bg-white">
            <tr>
              <th
                style={{ width: "350px" }}
                className="sticky top-0 z-30 bg-white"
              ></th>
              {displayCountries.map((country, i) => {
                const placeholder =
                  i < REGIONS.length ? REGIONS[i] : "Any Region";
                // Get the region for the selected country to display in value
                const selectedRegion =
                  country && country !== "Pick Country"
                    ? countriesWithRegion.find((c) => c.name === country)
                        ?.region
                    : null;
                const selectedValue = selectedRegion
                  ? { value: country, label: selectedRegion }
                  : null;
                return (
                  <th key={i} style={{ width: colWidth }}>
                    <Select
                      value={selectedValue}
                      onChange={(selected) =>
                        onCountrySelect(
                          { target: { value: selected ? selected.value : "" } },
                          i
                        )
                      }
                      // ✅ Updated options per selected region or default
                      options={getOptionsWithRegionFirst(country, placeholder)}
                      isSearchable={true}
                      placeholder={placeholder}
                      classNamePrefix="react-select"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: "40px",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                      }}
                    />
                  </th>
                );
              })}
            </tr>

            <tr>
              <th className="bg-primary text-white font-bold p-4 sticky left-0 z-[4] rounded-lg overflow-hidden">
                Questions
              </th>
              {displayCountries.map((country, i) => (
                <th key={i} className="bg-white shadow rounded-lg p-4">
                  {country === "Pick Country" || country === "" ? (
                    <span className="text-gray-400 italic">--</span>
                  ) : (
                    country
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {EVALUATION_CATEGORIES.map((cat) => (
              <React.Fragment key={cat}>
                <tr>
                  <td
                    className="font-bold bg-primary text-white cursor-pointer p-4 sticky left-0 z-[3] rounded-lg "
                    onClick={() => toggleCategory(cat)}
                  >
                    <span
                      className={`mr-2 inline-block transition-transform ${
                        expandedCategories[cat] ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                    {cat}
                  </td>
                  {displayCountries.map((_, i) => (
                    <td key={i}></td>
                  ))}
                </tr>

                {expandedCategories[cat] &&
                  QUESTIONS[cat].map((q, qi) => (
                    <tr key={`${cat}-${qi}`}>
                      <td className="p-4 bg-white shadow rounded-lg sticky left-0 z-[3] text-left">
                        {q}
                      </td>
                      {displayCountries.map((country, i) => (
                        <td
                          key={i}
                          className="p-4 bg-white shadow rounded-lg text-center"
                        >
                          {renderYesNoAnswer(country, cat, qi)}
                        </td>
                      ))}
                    </tr>
                  ))}
              </React.Fragment>
            ))}

            <tr>
              <td className="font-bold bg-primary text-white p-4 sticky left-0 z-[3] rounded-lg">
                Score
              </td>
              {displayCountries.map((country, i) => (
                <td key={i} className="p-4 bg-white shadow rounded-lg">
                  {calcScore(country)}
                </td>
              ))}
            </tr>

            {renderGenericSection("VaccinationSystem", "v")}
            {renderGenericSection("HCP_Providers", "h")}
            {renderGenericSection("Healthcare", "hc")}
            {renderGenericSection("Country", "c")}
            {renderGenericSection("Politics", "p")}
            {renderGenericSection("Education", "e")}
            {renderGenericSection("Population", "pl")}
            {renderGenericSection("Others", "o")}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
