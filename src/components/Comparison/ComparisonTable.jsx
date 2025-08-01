import React from "react";
import { getFlagUrl, getCountryData, EVALUATION_CATEGORIES } from "../../utils/countryUtils";

const ComparisonTable = ({ comparisonCountries }) => {
  const renderEvaluationCell = (country, category) => {
    if (country === "Pick Country") return "--";
    
    const countryData = getCountryData(country);
    const aKey = `${category} a`;
    const bKey = `${category} b`;
    
    const getBoxClass = (value) => value === "No" ? "value-box red" : "value-box green";
    const formatValue = (value) => !value ? "--" : (value === "No" ? "No" : "Yes");
    
    return (
      <div className="ab-box">
        <span className={getBoxClass(countryData[aKey])}>
          A: {formatValue(countryData[aKey])}
        </span>
        <span className={getBoxClass(countryData[bKey])}>
          B: {formatValue(countryData[bKey])}
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
      if (countryData[aKey] && countryData[aKey] !== "No") count++;
      if (countryData[bKey] && countryData[bKey] !== "No") count++;
      return count;
    }, 0);
    
    return `${yesCount}/8`;
  };

  return (
    <div className="comparison-wrapper">
      <div className="comparison-table" id="comparisonTable">
        <div className="table-header">Info</div>
        {comparisonCountries.map((country, i) => (
          <div key={i} className="table-header" id={`c${i + 1}Name`}>
            {country === "Pick Country" ? "Select Country" : country}
          </div>
        ))}

        <div className="label-cell">Flag</div>
        {comparisonCountries.map((country, i) => (
          <div key={i} className="table-cell" id={`c${i + 1}Flag`}>
            {country !== "Pick Country" && getFlagUrl(country) ? (
              <img src={getFlagUrl(country)} alt={country} />
            ) : (
              "--"
            )}
          </div>
        ))}

        {EVALUATION_CATEGORIES.map(category => (
          <React.Fragment key={category}>
            <div className="label-cell">{category}</div>
            {comparisonCountries.map((country, i) => (
              <div key={i} className="table-cell" id={`c${i + 1}${category}`}>
                {renderEvaluationCell(country, category)}
              </div>
            ))}
          </React.Fragment>
        ))}

        <div className="label-cell">Country Score Total (CST)</div>
        {comparisonCountries.map((country, i) => (
          <div key={i} className="table-cell" id={`c${i + 1}TotalYes`}>
            {calculateCountryScore(country)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;