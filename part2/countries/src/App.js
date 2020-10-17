import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Components/Search";
import Countries from "./Components/Countries";

const App = () => {
  const [searchVal, setSearchVal] = useState("");
  const [countries, setCountries] = useState([]);

  //handles selecting an individual country by clicking the show button
  const [selCountry, setSelCountry] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((resp) => {
      setCountries(resp.data);
    });
  }, []);

  const handleSearchVal = (event) => {
    setSearchVal(event.target.value);
    //when changing search query, reset the selected country
    setSelCountry(null);
  };

  return (
    <div>
      <Search
        searchVal={searchVal}
        handleSearchVal={handleSearchVal}
        setSelCountry={setSelCountry}
      />
      <Countries
        countries={countries}
        searchVal={searchVal}
        selCountry={selCountry}
        setSelCountry={setSelCountry}
      />
    </div>
  );
};

export default App;
