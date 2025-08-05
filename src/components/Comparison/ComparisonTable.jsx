import React from "react";
import { getFlagUrl, getCountryData, EVALUATION_CATEGORIES } from "../../utils/countryUtils";

const ComparisonTable = ({ comparisonCountries }) => {
  const renderEvaluationCell = (country, category) => {
    if (country === "Pick Country") return "--";
    
    const countryData = getCountryData(country);
    const aKey = `${category} a`;
    const bKey = `${category} b`;
    
    const getBoxClass = (value) => {
      if (!value || value === "No") return "evaluation-box no";
      return "evaluation-box yes";
    };
    const formatValue = (value) => !value ? "NO" : (value === "No" ? "NO" : "YES");
    
    return (
      <div className="evaluation-container">
        <span className={getBoxClass(countryData[aKey])}>
          {formatValue(countryData[aKey])}
        </span>
        <span className={getBoxClass(countryData[bKey])}>
          {formatValue(countryData[bKey])}
        </span>
      </div>
    );
  };

  const calculateCountryScore = (country) => {
    if (country === "Pick Country") return "--";
    
    const countryData = getCountryData(country);
    const yesCount = EVALUATION_CATEGORIES.reduce((count, category) => {
      const aKey = `${category} a`;
      const bKey = `${category} b`;
      const totalQuestions = EVALUATION_CATEGORIES.length * 2; // 2 questions per category
      if (countryData[aKey] && countryData[aKey] !== "No") count++;
      if (countryData[bKey] && countryData[bKey] !== "No") count++;
      return count;
    }, 0);
    
    return (
      <span className="country-score">
        {yesCount}/8
      </span>
    );
  };

  return (
    <div className="comparison-wrapper">
      <div className="table-center-header">
        <h1>Vaccination Comparison Table</h1>
      </div>
      
      <div className="comparison-table" id="comparisonTable">
        <div className="table-header question-header">Question</div>
        {comparisonCountries.map((country, i) => (
          <div key={i} className="table-header country-header" id={`c${i + 1}Name`}>
            {country === "Pick Country" ? "Select Country" : country}
          </div>
        ))}


        {EVALUATION_CATEGORIES.map(category => (
          <React.Fragment key={category}>
            <div className="category-header">{category}</div>
            {comparisonCountries.map((country, i) => (
              <div key={i} className="evaluation-cell" id={`c${i + 1}${category}`}>
                {renderEvaluationCell(country, category)}
              </div>
            ))}
          </React.Fragment>
        ))}

        <div className="score-header">Country Score Total</div>
        {comparisonCountries.map((country, i) => (
          <div key={i} className="score-cell" id={`c${i + 1}TotalYes`}>
            {calculateCountryScore(country)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;