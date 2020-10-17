import React from "react";
import Country from "./Country";

const Countries = ({ countries, searchVal, selCountry, setSelCountry }) => {
  const selCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  if (selCountries.length > 1 && selCountries.length <= 10) {
    return (
      <div>
        {selCountries.map((country) => (
          <p key={country.alpha2Code}>
            {country.name}{" "}
            <button type="button" onClick={() => setSelCountry(country)}>
              show
            </button>
          </p>
        ))}
        <Country country={selCountry} />
      </div>
    );
  } else if (selCountries.length === 1) {
    return <Country country={selCountries[0]} />;
  } else if (selCountries.length === 0) {
    return <p>No country found</p>;
  }
  return <p>Too many matches, specify another filter</p>;
};

export default Countries;
