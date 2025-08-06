import React from "react";
import { useState } from "react";
import {
  getFlagUrl,
  getCountryData,
  EVALUATION_CATEGORIES,
} from "../../utils/countryUtils";

const ComparisonTable = ({ comparisonCountries }) => {
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
    if (country === "Pick Country") return "--";

    const countryData = getCountryData(country);
    const questionKey = questionIndex === 0 ? `${category} a` : `${category} b`;
    const value = countryData[questionKey];

    const getBoxClass = (val) => {
      if (!val || val === "No") return "evaluation-box no";
      return "evaluation-box yes";
    };
    const formatValue = (val) => (!val || val === "No" ? "NO" : "YES");

    const isYes = formatValue(value) === "YES";
    // Placeholder URL: In a real application, you would fetch the actual URL
    // from your countryData or a specific mapping based on country, category, and question.
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
    if (country === "Pick Country") return "--";

    const countryData = getCountryData(country);
    const yesCount = EVALUATION_CATEGORIES.reduce((count, category) => {
      const aKey = `${category} a`;
      const bKey = `${category} b`;
      if (countryData[aKey] && countryData[aKey] !== "No") count++;
      if (countryData[bKey] && countryData[bKey] !== "No") count++;
      return count;
    }, 0);

    return <span className="country-score">{yesCount}/8</span>;
  };

  return (
    <div className="comparison-wrapper">
      <style>
        {`
          table {
            width: 1000px;
            border-collapse: separate;
            border-spacing: 10px;
            margin: 20px auto;
            font-family: Arial, sans-serif;
            table-layout: fixed;

          }
          th, td {
            border: none;
            padding: 15px;
            text-align: center;
            background-color: #fff;
            width: calc((1000px - 6 * 10px) / 7);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
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
          .collapsible-questions-table,.collapsible-questions-table td, .collapsible-questions-table tr{
          background-color: #C5BDBB;}
        `}
      </style>

      <table>
        <thead>
          <tr>
            <th style={{background:"#F8AC58"}}>Questions</th>
            {comparisonCountries.map((country, i) => (
              <th key={i}>
                {country === "Pick Country" ? `Pick Country` : country}
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
                      display: expandedCategories[category] ? "table" : "none",
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
  );
};

export default ComparisonTable;
