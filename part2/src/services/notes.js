import axios from "axios";

const baseUrl = `/api/notes`;

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((resp) => resp.data);
}

function create(newObject) {
  const request = axios.post(baseUrl, newObject);
  return request.then((resp) => resp.data);
}

function update(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject);

  return request.then((resp) => resp.data);
}

export default { getAll, create, update };
