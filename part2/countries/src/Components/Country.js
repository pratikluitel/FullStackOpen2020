import React from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  if (country === null) {
    return null;
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} width="200px" />
      <Weather capital={country.capital} />
    </div>
  );
};

export default Country;
