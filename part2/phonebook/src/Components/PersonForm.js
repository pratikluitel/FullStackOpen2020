import React, { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons }) => {
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
    const id = persons.findIndex((person) => person.name === newName);

    if (id === -1) {
      personService.create(newName, newNumber).then((person) => {
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
      });
    } else if (
      window.confirm(
        `${newName} is already added to phonebook. replace the old number with a new one?`
      )
    ) {
      const editedPerson = {
        ...persons[id],
        number: newNumber,
      };
      personService.edit(id + 1, editedPerson).then(() => {
        const newPersons = persons.filter((person) => person.id !== id + 1);
        setPersons(newPersons.concat(editedPerson));
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
