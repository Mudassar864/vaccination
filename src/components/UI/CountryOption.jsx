import React from "react";
import { getFlagUrl } from "../../utils/countryUtils";

const CountryOption = ({ country, isSelected, onClick }) => (
  <label className="country-option">
    <input
      type="checkbox"
      name="country"
      value={country}
      checked={isSelected}
      onChange={() => onClick(country)}
    />
    <span className="checkmark"></span>
    <img src={getFlagUrl(country)} alt={country} />
    <div style={{ textAlign: "center" }}>{country}</div>
  </label>
);

export default CountryOption;