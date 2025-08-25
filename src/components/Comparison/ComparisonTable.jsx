import React from "react";
import { useState } from "react";
import {
  getFlagUrl,
  getCountryData,
  EVALUATION_CATEGORIES,
  REGIONS,
} from "../../utils/countryUtils";

const ComparisonTable = ({ comparisonCountries, countries, countriesWithRegion, onCountrySelect }) => {
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
        "a. There are goals for future vaccine needs (e.g., over the next 3, 5 or 10 years).",
        "b. There is ≥1 specific, officially published and well-known national vaccination target to be reached by a specific date (e.g., measles elimination by end 2025).",
      ],
      Plan: [
        "a. There is one (and only one) plan published by a WHO-type NITAG.",
        "b. Pipeline vaccines are continuously reviewed pre-licensure by NITAG.",
      ],
      Implementation: [
        "a. Implementation strategies are clearly defined and documented.",
        "b. There are established monitoring systems for vaccine implementation.",
      ],
      Evaluation: [
        "a. Regular evaluation processes are in place for vaccination programs.",
        "b. Performance metrics and indicators are systematically tracked.",
      ],
    };
    return questions[category] || [];
  };

  const renderSingleEvaluationAnswer = (country, category, questionIndex) => {
    // Show "--" for empty country or "Pick Country"
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
    // Show "--" for empty country or "Pick Country"
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

  // Calculate dynamic widths based on number of countries
  const numCountries = comparisonCountries.length;
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
      <style>
        {`
            .comparison-wrapper {
              overflow-x: auto;
              width: 1440px;
              max-width: 100%;
              margin: 0 auto;
            }
            table {
              width: 1200px; /* fixed table width */
              border-collapse: separate;
              border-spacing: 10px;
              margin: 20px auto;
              font-family: Arial, sans-serif;
              table-layout: fixed; /* important for fixed-width cells */
            }

            th, td {
              border: none;
              padding: 15px;
              text-align: center; /* center content */
              background-color: #fff;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              overflow: hidden;
              word-wrap: break-word;
            }

            th:first-child,
            td:first-child {
              width: 250px;  /* fixed width for Questions column */
              min-width: 250px;
            }

            th:not(:first-child),
            td:not(:first-child) {
              width: 150px;  /* fixed width for each country column */
              min-width: 150px;
            }

           
            
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
           
            td.category-cell {
              text-align: left;
              vertical-align: middle;
              font-weight: bold;
              padding: 0;
              background-color: #fff;
            }
            td.category-cell.category-cell-collapsed-bg {
              background-color: #F8AC58;
            }
            td.category-cell table {
              width: 100%;
              height: 100%;
              border-collapse: collapse;
              margin: 0;
            }
            td.category-cell table td {
              border: none;
              text-align: left;
              vertical-align: middle;
              padding: 10px 15px;
              font-weight: normal;
              font-size: 0.9em;
            }
            td.category-cell .category-name {
              display: block;
              padding: 15px;
              background-color: #F8AC58;
              border-bottom: none;
              font-weight: bold;
              font-size: 1em;
              cursor: pointer;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            tr.gap-row td {
              height: 20px;
              border: none;
              background-color: transparent;
              padding: 0;
              box-shadow: none;
            }
            .evaluation-box {
              display: inline-block;
              padding: 6px 10px;
              border-radius: 4px;
              font-size: 0.85em;
              font-weight: bold;
            }
            .evaluation-box.yes {
              background-color: #d4edda;
              color: #155724;
            }
            .evaluation-box.no {
              background-color: #f8d7da;
              color: #721c24;
            }
            .expand-icon {
              transition: transform 0.2s ease-in-out;
              margin-right: 5px;
            }
            .expand-icon.expanded {
              transform: rotate(180deg);
            }
            .collapsible-questions-table, .collapsible-questions-table td, .collapsible-questions-table tr {
              background-color: #C5BDBB;
            }
            .empty-state {
              color: #666;
              font-style: italic;
            }
          `}
      </style>

      {comparisonCountries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <h3>No countries selected for comparison</h3>
          <p>
            Please select at least 6 countries to view the comparison table.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th style={{background:"none",boxShadow:"none"}} ></th>
                {comparisonCountries.map((country, i) => {
                  const regionName = REGIONS[i % REGIONS.length];
                  return (
                    <th key={i} style={{ padding: "10px" }}>
                      <select
                        value={country === "Pick Country" ? "" : country}
                        onChange={(e) => onCountrySelect && onCountrySelect(e, i)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                          fontSize: "0.85em",
                          backgroundColor: "#fff"
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
                <th style={{ background: "#F8AC58" }}>Questions</th>
                {comparisonCountries.map((country, i) => (
                  <th key={i}>
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
                      rowSpan="2"
                      className={`category-cell ${
                        expandedCategories[category]
                          ? ""
                          : "category-cell-collapsed-bg"
                      }`}
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
                      <table
                        className="collapsible-questions-table"
                        style={{
                          display: expandedCategories[category]
                            ? "table"
                            : "none",
                        }}
                      >
                        {getQuestions(category).map((question, qIndex) => (
                          <tr key={qIndex}>
                            <td>{question}</td>
                          </tr>
                        ))}
                      </table>
                    </td>
                    {comparisonCountries.map((country, i) => (
                      <td key={i}>
                        {renderSingleEvaluationAnswer(country, category, 0)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {comparisonCountries.map((country, i) => (
                      <td key={i}>
                        {renderSingleEvaluationAnswer(country, category, 1)}
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              ))}

              <tr>
                <td className="category-cell">
                  <div className="category-name">Score</div>
                </td>
                {comparisonCountries.map((country, i) => (
                  <td key={i}>{calculateCountryScore(country)}</td>
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