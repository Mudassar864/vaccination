import React from "react";
import { getFlagUrl } from "../../utils/countryUtils";

const CountryOption = ({ country, isSelected, onClick }) => (
  <label className="max-w-full relative flex flex-col items-center p-4 px-2 bg-white rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.1)] cursor-pointer transition-all border-2 border-transparent hover:border-gray-300 hover:-translate-y-0.5">
    <input
      type="checkbox"
      name="country"
      value={country}
      checked={isSelected}
      onChange={() => onClick(country)}
      className="hidden peer"
    />

    {/* Custom checkbox circle */}
    <span
      className={`absolute top-2 right-2 h-5 w-5 flex items-center justify-center rounded-full border-2 transition-all ${
        isSelected
          ? "bg-green-500 border-green-500"
          : "bg-white border-gray-300"
      }`}
    >
      {isSelected && (
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </span>

    {/* Country flag */}
    <img
      src={getFlagUrl(country)}
      alt={country}
      className="w-10 h-auto mb-2"
    />

    {/* Country name */}
    <div className="text-center text-sm font-medium">{country}</div>
  </label>
);

export default CountryOption;
