import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((resp) => resp.data);

const create = (newName, newNumber) =>
  axios
    .post(baseUrl, {
      name: newName,
      number: newNumber,
    })
    .then((resp) => resp.data);

const deleteOne = (id) =>
  axios.delete(`http://localhost:3001/persons/${id}`).then((resp) => resp.data);

export default { getAll, create, deleteOne };
