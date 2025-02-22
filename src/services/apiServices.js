import axios from "../axios";

const postCreateUser = (data) => {
  return axios.post("api/v1/participant", data);
};
const getAllUser = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const deleteUser = (idUser) => {
  return axios.delete("api/v1/participant", { data: { id: idUser } });
};
const updateUser = (data) => {
  return axios.put("api/v1/participant", data);
};
export { postCreateUser, getAllUser, deleteUser, updateUser };
