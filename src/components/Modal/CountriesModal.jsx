import React from "react";
import CountryOption from "../UI/CountryOption";
import Button from "../UI/Button";
import { DISPLAY_COUNTRIES } from "../../utils/countryUtils";

const CountriesModal = ({ 
  isOpen, 
  onClose, 
  countries, 
  selectedCountries, 
  onToggleSelection, 
  onCompare 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={(e) => e.target.className === "modal" && onClose()}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>All Countries</h2>
        <div className="modal-grid">
          {countries.slice(DISPLAY_COUNTRIES).map(country => (
            <CountryOption
              key={country}
              country={country}
              isSelected={selectedCountries.includes(country)}
              onClick={onToggleSelection}
            />
          ))}
        </div>
      </div>
      <div style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)"
      }}>
        <Button onClick={onCompare}>Compare</Button>
      </div>
    </div>
  );
};

export default CountriesModal;