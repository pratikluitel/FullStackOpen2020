import axios from "axios";

const baseUrl = " /api/persons";

const getAll = () => axios.get(baseUrl).then((resp) => resp.data);

const create = (newName, newNumber) =>
  axios
    .post(baseUrl, {
      name: newName,
      number: newNumber,
    })
    .then((resp) => resp.data);

const deleteOne = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((resp) => resp.data);

const edit = (id, newPerson) =>
  axios.put(`${baseUrl}/${id}`, newPerson).then((resp) => resp.data);

export default { getAll, create, deleteOne, edit };
