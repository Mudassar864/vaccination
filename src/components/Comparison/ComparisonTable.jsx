import React from "react";
import { useState } from "react";
import { getFlagUrl, getCountryData, EVALUATION_CATEGORIES } from "../../utils/countryUtils";

const ComparisonTable = ({ comparisonCountries }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showInstructions, setShowInstructions] = useState(true);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getQuestions = (category) => {
    const questions = {
      "Goals": [
        "a. There are goals for future vaccine needs (e.g., over the next 3, 5 or 10 years).",
        "b. There is ≥1 specific, officially published and well-known national vaccination target to be reached by a specific date (e.g., measles elimination by end 2025)."
      ],
      "Plan": [
        "a. There is one (and only one) plan published by a WHO-type NITAG.",
        "b. Pipeline vaccines are continuously reviewed pre-licensure by NITAG."
      ],
      "Implementation": [
        "a. Implementation strategies are clearly defined and documented.",
        "b. There are established monitoring systems for vaccine implementation."
      ],
      "Evaluation": [
        "a. Regular evaluation processes are in place for vaccination programs.",
        "b. Performance metrics and indicators are systematically tracked."
      ]
    };
    return questions[category] || [];
  };
  const renderEvaluationCell = (country, category, isExpanded = false) => {
    if (country === "Pick Country") return "--";
    
    const countryData = getCountryData(country);
    const aKey = `${category} a`;
    const bKey = `${category} b`;
    
    const getBoxClass = (value) => {
      if (!value || value === "No") return "evaluation-box no";
      return "evaluation-box yes";
    };
    const formatValue = (value) => !value ? "NO" : (value === "No" ? "NO" : "YES");
    
    // When expanded, don't show the combined view
    if (isExpanded) return null;
    
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

  const renderQuestionAnswer = (country, category, questionIndex) => {
    if (country === "Pick Country") return "--";
    
    const countryData = getCountryData(country);
    const questionKey = questionIndex === 0 ? `${category} a` : `${category} b`;
    const value = countryData[questionKey];
    const hasValue = value && value !== "No";
    
    return (
      <div className="single-answer">
        <span className={`evaluation-box ${hasValue ? 'yes' : 'no'}`}>
          {hasValue ? "YES" : "NO"}
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

  const hasSelectedCountries = comparisonCountries.some(country => country !== "Pick Country");

  return (
    <div className="comparison-wrapper">
      <div className="table-center-header">
        <h1>Vaccination Comparison Table</h1>
        {showInstructions && (
          <div className="instructions-banner">
            <div className="instructions-content">
              <span className="instructions-icon">💡</span>
              <div className="instructions-text">
                <strong>How to use:</strong> Select up to 6 countries above to compare their vaccination programs. 
                Click on category headers to expand and see detailed questions.
              </div>
              <button 
                className="close-instructions" 
                onClick={() => setShowInstructions(false)}
                aria-label="Close instructions"
              >
                ×
              </button>
            </div>
          </div>
        )}
        {!hasSelectedCountries && (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <h3>No Countries Selected</h3>
            <p>Please select countries from the section above to start comparing vaccination programs.</p>
          </div>
        )}
      </div>
      
      {hasSelectedCountries && (
        <div className="comparison-table" id="comparisonTable">
        <div className="table-header question-header">Question</div>
        {comparisonCountries.map((country, i) => (
          <div key={i} className="table-header country-header" id={`c${i + 1}Name`}>
            {country === "Pick Country" ? (
              <span className="select-country-placeholder">Select Country</span>
            ) : (
              <div className="country-header-content">
                <img src={getFlagUrl(country)} alt={`${country} flag`} className="country-flag" />
                <span>{country}</span>
              </div>
            )}
          </div>
        ))}

        {EVALUATION_CATEGORIES.map(category => (
          <React.Fragment key={category}>
            <div className="category-header" onClick={() => toggleCategory(category)}>
              <div className="category-title">
                <span className={`expand-icon ${expandedCategories[category] ? 'expanded' : ''}`}>
                  ▼
                </span>
                {category}
              </div>
            </div>
            {comparisonCountries.map((country, i) => (
              <div key={i} className="evaluation-cell" id={`c${i + 1}${category}`}>
                {renderEvaluationCell(country, category, expandedCategories[category])}
              </div>
            ))}
            
            {expandedCategories[category] && (
              <>
                {getQuestions(category).map((question, qIndex) => (
                  <React.Fragment key={`${category}-q${qIndex}`}>
                    <div className="question-detail">
                      {question}
                    </div>
                    {comparisonCountries.map((country, i) => (
                      <div key={i} className="question-answer-cell">
                        {renderQuestionAnswer(country, category, qIndex)}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </>
            )}
          </React.Fragment>
        ))}

        <div className="score-header">Country Score Total</div>
        {comparisonCountries.map((country, i) => (
          <div key={i} className="score-cell" id={`c${i + 1}TotalYes`}>
            {calculateCountryScore(country)}
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;