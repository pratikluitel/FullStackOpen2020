import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./Components/SearchFilter";
import Person from "./Components/Person";
import PersonForm from "./Components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((resp) => {
      setPersons(resp.data);
    });
  }, []);

  const handleNewFilter = (event) => {
    setFilter(event.target.value);
  };

  const displayedPersons =
    filter.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} handleNewFilter={handleNewFilter} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      {displayedPersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
