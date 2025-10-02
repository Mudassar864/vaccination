import CountryOption from "./UI/CountryOption";
import Button from "./UI/Button";
import { DISPLAY_COUNTRIES } from "../utils/countryUtils";

const CountrySearch = ({
  countryFilterQuery,
  setCountryFilterQuery,
  selectedCountries,
  toggleCountrySelection,
  handleCompare,
  handleClear,
  setIsModalOpen,
  COUNTRIES
}) => {
  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countryFilterQuery.toLowerCase())
  );

  const displayCountries = countryFilterQuery
    ? filteredCountries
    : COUNTRIES.slice(0, DISPLAY_COUNTRIES);

  const remainingCount = countryFilterQuery
    ? 0
    : Math.max(0, COUNTRIES.length - DISPLAY_COUNTRIES);

  return (
    <section className="bg-[#f4f6fc] py-10 px-5 text-center">
      <h2 className="text-4xl font-semibold mb-7">Search by Countries</h2>

      <div className="relative max-w-[400px] mx-auto mb-7 w-full">
        <input
          type="text"
          placeholder="Filter countries..."
          value={countryFilterQuery}
          onChange={(e) => setCountryFilterQuery(e.target.value)}
          className="w-full py-3 pr-11 pl-4 text-base border-2 border-[#e1e5e9] rounded-xl bg-white transition-all focus:outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(0,120,212,0.1)]"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-gray-600 pointer-events-none">🔍</span>
      </div>

      <form onSubmit={handleCompare}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-5 max-w-7xl mx-auto px-2">
          {displayCountries.map((country) => (
            <CountryOption
              key={country}
              country={country}
              isSelected={selectedCountries.includes(country)}
              onClick={toggleCountrySelection}
            />
          ))}
          {remainingCount > 0 && (
            <Button onClick={() => setIsModalOpen(true)}>
              + {remainingCount} More
            </Button>
          )}
        </div>
        <div className="text-center mt-7">
          <Button type="submit">Compare</Button>
          <Button className="ml-2" onClick={handleClear}>Clear</Button>
        </div>
      </form>
    </section>
  );
};

export default CountrySearch;
