import axios from "axios";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const baseUrl = `/api/notes`;

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((resp) => resp.data);
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

function update(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject);

  return request.then((resp) => resp.data);
}

export default { getAll, create, update, setToken };
