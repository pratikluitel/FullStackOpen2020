import React from "react";

const Country = ({ country }) => {
  if (country === null) {
    return null;
  }
  const languages = country.languages;
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} width="200px" />
    </div>
  );
};

export default Country;
