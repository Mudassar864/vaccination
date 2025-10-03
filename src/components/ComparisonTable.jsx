import React, { useState } from "react";
import {
  getCountryData,
  EVALUATION_CATEGORIES,
  REGIONS,
} from "../utils/countryUtils";
import { Link } from "react-router-dom";

const ComparisonTable = ({
  comparisonCountries,
  countries,
  countriesWithRegion,
  onCountrySelect,
}) => {
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const initialExpandedState = {};
    EVALUATION_CATEGORIES.forEach((category) => {
      initialExpandedState[category] = true;
    });
    return initialExpandedState;
  });

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getQuestions = (category) => {
    const questions = {
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
      ExtraQuestion: [
        "Does COUNTRY have a national vaccine licensing authority? Name the authority and provide the link to the website?",
        "Does this authority organize and conduct scientifically sound adverse event surveillance? Provide the ink to the respective website?",
        "How is the market for vaccines organized, is it open access or based on government / insurance purchases for the public?",
        "Source",
      ],
    };
    return questions[category] || [];
  };

  const renderSingleEvaluationAnswer = (country, category, questionIndex) => {
    if (!country || country === "Pick Country" || country === "--") return "--";

    const countryData = getCountryData(country);
    if (!countryData) return "--";

    const questionKey = questionIndex === 0 ? `${category} a` : `${category} b`;
    const value = countryData[questionKey];

    const formatValue = (val) => (!val || val === "No" ? "NO" : "YES");
    const isYes = formatValue(value) === "YES";
    const linkUrl = isYes ? value : null;

    return (
      <span
        className={`inline-block px-2 py-1 rounded text-xs font-bold text-center min-w-[40px] ${
          isYes ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isYes ? (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-inherit"
          >
            {formatValue(value)}
          </a>
        ) : (
          formatValue(value)
        )}
      </span>
    );
  };

  const calculateCountryScore = (country) => {
    if (!country || country === "Pick Country" || country === "--") return "--";

    const countryData = getCountryData(country);
    if (!countryData) return "--";

    const yesCount = EVALUATION_CATEGORIES.reduce((count, category) => {
      const aKey = `${category} a`;
      const bKey = `${category} b`;
      if (countryData[aKey] && countryData[aKey] !== "No") count++;
      if (countryData[bKey] && countryData[bKey] !== "No") count++;
      return count;
    }, 0);

    return <span className="font-bold text-lg">{yesCount}/8</span>;
  };

  const minColumns = 6;
  const displayCountries = [...comparisonCountries];
  while (displayCountries.length < minColumns) {
    displayCountries.push("Pick Country");
  }

  const numCountries = Math.max(comparisonCountries.length, minColumns);
  const minTableWidth = 800;
  const maxTableWidth = 1400;
  const tableWidth = Math.max(
    minTableWidth,
    Math.min(maxTableWidth, 200 + numCountries * 150)
  );
  const columnWidth =
    numCountries > 0 ? `${(tableWidth - 200) / numCountries}px` : "150px";
  const renderExtraQuestionAnswer = (country, questionIndex) => {
    if (!country || country === "Pick Country" || country === "--") return "--";

    const countryData = getCountryData(country);
    if (!countryData) return "--";

    // Map question index to keys q1, q2, q3...
    const key = `q${questionIndex + 1}`;
    const value = countryData[key];

    if (!value) return "--";

    // If value contains links separated by comma, split and render as <a>
    const parts = value.split(",").map((part, i) => part.trim());
    return parts.map((part, i) => (
      <div key={i}>
        {part.startsWith("http") ? (
          <>
            Link:{" "}
            <Link
              to={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Available 
            </Link>
          </>
        ) : (
          part
        )}
      </div>
    ));
  };
  return (
    <div className="comparison-wrapper text-center py-10 px-5 bg-gray-50 min-h-[60vh]">
      <div className="overflow-x-auto w-full max-w-[1440px] mx-auto relative">
        <table
          style={{ width: `${tableWidth}px` }}
          className="min-w-[1440px] border-separate border-spacing-2 my-5 mx-auto font-sans"
        >
          <thead>
            <tr>
              <th
                style={{ width: "200px" }}
                className="bg-transparent shadow-none"
              ></th>
              {displayCountries.map((country, i) => {
                const regionName = REGIONS[i % REGIONS.length];
                return (
                  <th key={i} style={{ width: columnWidth }} className="p-2">
                    <select
                      value={country === "Pick Country" ? "" : country}
                      onChange={(e) => onCountrySelect && onCountrySelect(e, i)}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f8ac58'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 10px center",
                        backgroundSize: "16px",
                      }}
                      className="w-full py-2 px-3 rounded border border-gray-300 text-sm font-sans text-gray-800 cursor-pointer transition-all shadow-sm min-w-[120px] appearance-none bg-white hover:border-accent hover:shadow-[0_0_8px_rgba(248,172,88,0.3)] hover:bg-gray-50 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(248,172,88,0.2)]"
                    >
                      <option value="">{regionName}</option>
                      {(countriesWithRegion || [])
                        .filter((c) => c.region === regionName)
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
              <th
                style={{ width: "200px" }}
                className="bg-primary text-white font-bold p-4 rounded-lg sticky left-0 z-[4]"
              >
                Questions
              </th>
              {displayCountries.map((country, i) => (
                <th
                  key={i}
                  style={{ width: columnWidth }}
                  className="border-none p-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden break-words"
                >
                  {!country ||
                  country === "Pick Country" ||
                  country === "--" ? (
                    <span className="text-gray-400 italic">--</span>
                  ) : (
                    country
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {EVALUATION_CATEGORIES.map((category) => (
              <React.Fragment key={category}>
                {/* Existing category rows */}
                <tr>
                  <td className="text-left align-middle font-bold p-0 bg-primary rounded-lg text-white sticky left-0 z-[3]">
                    <div
                      className="block p-4 bg-accent font-bold text-base cursor-pointer rounded-t-lg border-b-0"
                      onClick={() => toggleCategory(category)}
                    >
                      <span
                        className={`transition-transform duration-200 ease-in-out mr-1 inline-block ${
                          expandedCategories[category] ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                      {category}
                    </div>
                  </td>
                  {displayCountries.map((country, i) => (
                    <td
                      key={i}
                      className="bg-transparent shadow-none border-none"
                    ></td>
                  ))}
                </tr>
                {expandedCategories[category] &&
                  getQuestions(category).map((question, qIndex) => (
                    <tr key={`${category}-${qIndex}`}>
                      <td
                        style={{ width: "400px" }}
                        className="border-none p-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden break-words text-left sticky left-0 z-[3]"
                      >
                        {question}
                      </td>
                      {displayCountries.map((country, i) => (
                        <td
                          key={i}
                          style={{ width: columnWidth }}
                          className="border-none p-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden break-words"
                        >
                          {renderSingleEvaluationAnswer(
                            country,
                            category,
                            qIndex
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </React.Fragment>
            ))}

            {/* Score row */}
            <tr>
              <td
                style={{ width: "400px" }}
                className="text-left align-middle font-bold p-0 bg-primary rounded-lg sticky left-0 z-[3]"
              >
                <div className="block p-4 text-white font-bold text-base">
                  Score
                </div>
              </td>
              {displayCountries.map((country, i) => (
                <td
                  key={i}
                  style={{ width: columnWidth }}
                  className="border-none p-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden break-words"
                >
                  {calculateCountryScore(country)}
                </td>
              ))}
            </tr>

            {/* Extra Questions Section */}
            <tr>
              <td className="text-left align-middle font-bold p-0 bg-primary rounded-lg text-white sticky left-0 z-[3]">
                <div
                  className="block p-4 bg-accent font-bold text-base cursor-pointer rounded-t-lg border-b-0"
                  onClick={() => toggleCategory("ExtraQuestion")}
                >
                  <span
                    className={`transition-transform duration-200 ease-in-out mr-1 inline-block ${
                      expandedCategories["ExtraQuestion"] ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                  Extra Questions
                </div>
              </td>
              {displayCountries.map((country, i) => (
                <td
                  key={i}
                  className="bg-transparent shadow-none border-none"
                ></td>
              ))}
            </tr>
            {expandedCategories["ExtraQuestion"] &&
              getQuestions("ExtraQuestion").map((question, qIndex) => (
                <tr key={`ExtraQuestion-${qIndex}`}>
                  <td
                    style={{ width: "400px" }}
                    className="border-none p-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden break-words text-left sticky left-0 z-[3]"
                  >
                    {question}
                  </td>
                  {displayCountries.map((country, i) => (
                    <td
                      key={i}
                      style={{ width: columnWidth }}
                      className="border-none p-4 bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden break-words"
                    >
                      {renderExtraQuestionAnswer(country, qIndex)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
