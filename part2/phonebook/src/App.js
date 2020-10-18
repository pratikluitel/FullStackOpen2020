import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import SearchFilter from "./Components/SearchFilter";
import Person from "./Components/Person";
import PersonForm from "./Components/PersonForm";
import Message from "./Components/Message";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
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
      <Message message={message} setMessage={setMessage} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />

      <h2>Numbers</h2>
      {displayedPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          persons={persons}
          setPersons={setPersons}
        />
      ))}
    </div>
  );
};

export default App;
