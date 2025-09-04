import React from "react";
import { useState } from "react";
import {
  getCountryData,
  EVALUATION_CATEGORIES,
  REGIONS,
} from "../../utils/countryUtils";
import "./ComparisonTable.css";

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
    };
    return questions[category] || [];
  };

  const renderSingleEvaluationAnswer = (country, category, questionIndex) => {
    if (!country || country === "Pick Country" || country === "--") return "--";

    const countryData = getCountryData(country);
    if (!countryData) return "--";

    const questionKey = questionIndex === 0 ? `${category} a` : `${category} b`;
    const value = countryData[questionKey];

    const getBoxClass = (val) => {
      if (!val || val === "No") return "evaluation-box no";
      return "evaluation-box yes";
    };
    const formatValue = (val) => (!val || val === "No" ? "NO" : "YES");

    const isYes = formatValue(value) === "YES";
    const linkUrl = isYes ? value : null;

    return (
      <span className={getBoxClass(value)}>
        {isYes ? (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
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

    return <span className="country-score">{yesCount}/8</span>;
  };

  // Ensure at least 6 columns by padding with "Pick Country"
  const minColumns = 6;
  const displayCountries = [...comparisonCountries];
  while (displayCountries.length < minColumns) {
    displayCountries.push("Pick Country");
  }

  // Calculate dynamic widths based on number of columns (minimum 6)
  const numCountries = Math.max(comparisonCountries.length, minColumns);
  const minTableWidth = 800;
  const maxTableWidth = 1400;
  const tableWidth = Math.max(
    minTableWidth,
    Math.min(maxTableWidth, 200 + numCountries * 150)
  );
  const columnWidth =
    numCountries > 0 ? `${(tableWidth - 200) / numCountries}px` : "150px";

  return (
    <div className="comparison-wrapper">
      {comparisonCountries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <h3>No countries selected for comparison</h3>
          <p>Please select at least one country to view the comparison table.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: `${tableWidth}px` }}>
            <thead>
              <tr>
                <th style={{ width: "200px", background: "none", boxShadow: "none" }}></th>
                {displayCountries.map((country, i) => {
                  const regionName = REGIONS[i % REGIONS.length];
                  return (
                    <th key={i} style={{ width: columnWidth, padding: "10px" }}>
                      <select
                        value={country === "Pick Country" ? "" : country}
                        onChange={(e) =>
                          onCountrySelect && onCountrySelect(e, i)
                        }
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                          fontSize: "0.85em",
                          backgroundColor: "#fff",
                        }}
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
                <th style={{ width: "200px", background: "#F8AC58" }}>Questions</th>
                {displayCountries.map((country, i) => (
                  <th key={i} style={{ width: columnWidth }}>
                    {!country ||
                    country === "Pick Country" ||
                    country === "--" ? (
                      <span className="empty-state">--</span>
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
                  <tr>
                    <td
                      className={`category-cell ${
                        expandedCategories[category]
                          ? ""
                          : "category-cell-collapsed-bg"
                      }`}
                      style={{ width: "400px" }}
                      colSpan={displayCountries.length + 1} // Span all columns
                    >
                      <div
                        className="category-name collapsible-category-header"
                        onClick={() => toggleCategory(category)}
                      >
                        <span
                          className={`expand-icon ${
                            expandedCategories[category] ? "expanded" : ""
                          }`}
                        >
                          ▼
                        </span>
                        {category}
                      </div>
                    </td>
                  </tr>
                  {expandedCategories[category] &&
                    getQuestions(category).map((question, qIndex) => (
                      <tr key={`${category}-${qIndex}`}>
                        <td style={{ width: "400px",textAlign: "left" }}>
                          {question}
                        </td>
                        {displayCountries.map((country, i) => (
                          <td key={i} style={{ width: columnWidth }}>
                            {renderSingleEvaluationAnswer(country, category, qIndex)}
                          </td>
                        ))}
                      </tr>
                    ))}
                </React.Fragment>
              ))}
              <tr>
                <td className="category-cell" style={{ width: "400px" }}>
                  <div className="category-name">Score</div>
                </td>
                {displayCountries.map((country, i) => (
                  <td key={i} style={{ width: columnWidth }}>
                    {calculateCountryScore(country)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;