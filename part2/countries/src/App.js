import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ searchVal, handleSearchVal }) => {
  return (
    <div>
      find countries{" "}
      <input value={searchVal} onChange={handleSearchVal}></input>
    </div>
  );
};

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

const Countries = ({ countries, searchVal }) => {
  const [country, setCountry] = useState(null);
  const selCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  if (selCountries.length > 1 && selCountries.length <= 10) {
    return (
      <div>
        {selCountries.map((country) => (
          <p key={country.alpha2Code}>
            {country.name}{" "}
            <button type="button" onClick={() => setCountry(country)}>
              show
            </button>
          </p>
        ))}
        <Country country={country} />
      </div>
    );
  } else if (selCountries.length === 1) {
    return <Country country={selCountries[0]} />;
  } else if (selCountries.length === 0) {
    return <p>No country found</p>;
  }
  return <p>Too many matches, specify another filter</p>;
};

const App = () => {
  const [searchVal, setSearchVal] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((resp) => {
      setCountries(resp.data);
    });
  }, []);

  const handleSearchVal = (event) => setSearchVal(event.target.value);

  return (
    <div>
      <Search searchVal={searchVal} handleSearchVal={handleSearchVal} />
      <Countries countries={countries} searchVal={searchVal} />
    </div>
  );
};

export default App;
