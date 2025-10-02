import React from "react";

const SearchBar = ({ 
  searchQuery, 
  onSearch, 
  suggestions, 
  onSuggestionClick, 
  searchRef, 
  suggestionsRef 
}) => (
  <div className="search-container" ref={searchRef}>
    <input
      type="text"
      id="searchCountry"
      placeholder="Search for country"
      value={searchQuery}
      onChange={onSearch}
    />
    <span>🔍</span>
    {suggestions.length > 0 && (
      <ul id="suggestions" ref={suggestionsRef}>
        {suggestions.map(country => (
          <li key={country} onClick={() => onSuggestionClick(country)}>
            {country}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchBar;