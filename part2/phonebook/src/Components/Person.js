import React from "react";
import personService from "../services/persons";

const Person = ({ person, persons, setPersons }) => {
  const handleDelete = (id) =>
    personService.deleteOne(id).then(() => {
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
    });

  return (
    <p>
      {person.name} {person.number}{" "}
      <button type="button" onClick={() => handleDelete(person.id)}>
        delete
      </button>
    </p>
  );
};

export default Person;
