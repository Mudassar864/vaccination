import React, { useState } from "react";
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
    [...EVALUATION_CATEGORIES, "VaccinationSystem", "HCP_Providers","Healthcare","Country","Politics","Education","Population","Others"].forEach(
      (cat) => (initial[cat] = true)
    );
    return initial;
  });

  const toggleCategory = (category) =>
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));

  const QUESTIONS = {
    Goals: [
      "A. Are goals set for future vaccine needs (in 3, 5, or 10 years)?",
      "B. Is there at least one official national vaccination target with a deadline (e.g., measles elimination by 2025)?",
    ],
    Plan: [
      "A. Is there one official plan published by a WHO-type NITAG?",
      "B. Does the NITAG review pipeline vaccines before licensure?",
    ],
    Implementation: [
      "A. Are implementation strategies clearly defined and documented?",
      "B. Are monitoring systems in place for vaccine implementation?",
    ],
    Evaluation: [
      "A. Are vaccination programs regularly evaluated?",
      "B. Are performance indicators systematically tracked?",
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
    Healthcare:[
      "Describe In the few words the healthcare system in the country",
      "what type of healthcare insurance is exist and what percentage of the population are covered by insurance",
      "Is there regular and continuous, scientifically sound surveillance for all current and future vaccine preventable diseases",
      "is there mandatory reporting for selected infectious diseases",
      "Source"
    ],
    Country:[
      "What is the average monthly income in the country?",
      "What are the main sources of income for the nation?",
      "What is the GNP slash B IP in the country?",
      "Source",
      "What is the total spending for health care in the country?",
      "What is the unemployment rate in the country?",
      "what is the percentage of females in the working force?",
      "Source",
    ],
    Politics:[
      "Describe the political system in a few sentences?",
      "what are the main political institutions that govern the country?",
      "Source",
    ],
    Education:[
      "Describe briefly the educational system of the country and the relevant final jb titles or academic degrees achievable in the country",
      "Source",
    ],
    Population:[
      "What is the size of the population?",
      "What is the size of the birth cohort?",
      "What is the number of subjects 18 to 64 years old?",
      "What is the number of subjects 65 years of age or older?",
    ],
    Others:[
      "Which languages are officially spoken in the country?",
      "what is the capital of the country?",
      "what is the size of the country in square kilometers?",
      "what is the population density Population Density (people/sq km)?",
      "Describe the climate of the country in a few sentences?"
    ]
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
        className={`inline-block px-2 py-1 rounded text-xs font-bold text-center min-w-[40px] ${
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

    // Handle empty / falsy
    if (val === null || val === undefined || val === "No" || val === "")
      return "--";

    // ✅ Handle arrays
    if (Array.isArray(val)) {
      return val.map((item, i) => (
        <div key={i}>
          {typeof item === "string" && item.startsWith("http") ? (
            <Link
              to={item}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Available
            </Link>
          ) : (
            String(item)
          )}
        </div>
      ));
    }

    // ✅ Handle plain strings
    if (typeof val === "string") {
      // If it’s a URL
      if (val.startsWith("http")) {
        return (
          <Link
            to={val}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Available
          </Link>
        );
      }

      // ✅ Don’t split or modify anything — just print as-is
      return val;
    }

    // ✅ Handle numbers, booleans, objects
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

  const minCols = 6;
  const displayCountries = [...comparisonCountries];
  while (displayCountries.length < minCols)
    displayCountries.push("Pick Country");

  const num = Math.max(comparisonCountries.length, minCols);
  const width = Math.max(800, Math.min(1400, 200 + num * 150));
  const colWidth = `${(width - 200) / num}px`;

  /** ✅ Reusable section */
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
      <div className="overflow-x-auto w-full max-w-[1440px] mx-auto">
        <table
          style={{ width }}
          className="min-w-[1440px] border-separate border-spacing-2 my-5 mx-auto font-sans"
        >
          <thead>
            <tr>
              <th style={{ width: "200px" }}></th>
              {displayCountries.map((country, i) => {
                const region = REGIONS[i % REGIONS.length];
                return (
                  <th key={i} style={{ width: colWidth }}>
                    <select
                      value={country === "Pick Country" ? "" : country}
                      onChange={(e) => onCountrySelect(e, i)}
                      className="w-full py-2 px-3 rounded border border-gray-300 text-sm bg-white"
                    >
                      <option value="">{region}</option>
                      {(countriesWithRegion || [])
                        .filter((c) => c.region === region)
                        .map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                    </select>
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
                  {country === "Pick Country" ? (
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
                          className="p-4 bg-white shadow rounded-lg text-left"
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

            {renderGenericSection("VaccinationSystem", "q")}
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
