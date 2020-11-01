import React, { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons, setMessage, setError }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addNumber = (event) => {
    event.preventDefault();
    let editedPerson = persons.find((person) => person.name === newName);

    if (!editedPerson) {
      personService
        .create(newName, newNumber)
        .then((person) => {
          setPersons(persons.concat(person));
          setError(false);
          setMessage(`Added ${newName}`);
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          setError(true);
          setMessage(`Error: ${err.response.data.data}`);
        });
    } else if (
      window.confirm(
        `${newName} is already added to phonebook. replace the old number with a new one?`
      )
    ) {
      editedPerson = {
        ...editedPerson,
        number: newNumber,
      };
      personService
        .edit(editedPerson.id, editedPerson)
        .then(() => {
          const newPersons = persons.filter(
            (person) => person.id !== editedPerson.id
          );
          setPersons(newPersons.concat(editedPerson));
          setError(false);
          setMessage(`Changed ${editedPerson.name}`);
        })
        .catch((err) => {
          setError(true);
          setMessage(
            `Information of ${editedPerson.name} has already been removed from the server`
          );
        });
    }
  };

  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
