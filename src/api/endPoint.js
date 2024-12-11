import api from "./index";

export const signup = async (data) => {
  return await api.post("signup", data);
};

export const login = async (data) => {
  return await api.post("login", data);
};

export const getProducts = async () => {
  return await api.get("getProducts");
};

export const getProductById = async (productId) => {
  return await api.get(`getProductById/${productId}`);
};

export const UserAdress = async (data) => {
  return await api.post("address", data);
};
