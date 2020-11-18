import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const resp = await axios.get(baseUrl);
  return resp.data;
};

const add = async (info) => {
  const resp = await axios.post(baseUrl, info, {
    headers: { Authorization: token },
  });
  return resp.data;
};

const edit = async (info, id) => {
  const resp = await axios.put(baseUrl + `/${id}`, info);
  return resp.data;
};

export default { getAll, add, edit, setToken };
