import { COUNTRY_CODES, VACCINATION_DATA } from "../lib/data";

export const getCountryCode = (country) => COUNTRY_CODES[country]?.toLowerCase() || "";

export const getFlagUrl = (country) => {
  const code = getCountryCode(country);
  return code ? `https://flagcdn.com/w40/${code}.png` : "";
};

export const getCountryData = (country) => 
  VACCINATION_DATA.find(data => data.Country === country) || {};

export const REGIONS = ["Europe", "Africa", "Americas", "Asia", "Australia / New Zealand"];

export const MAX_COUNTRIES = 5;
export const DISPLAY_COUNTRIES = 20;
export const EVALUATION_CATEGORIES = ["Goals", "Plan", "Implementation", "Evaluation"];