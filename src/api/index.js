import axios from "axios";
import { _baseURL } from "../../consts";

const baseURL = `${_baseURL}/api`;

export const apiInstance = axios.create({
  baseURL: baseURL,
});
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log({ token });
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

//login
export const loginApi = async (body) => {
  try {
    const responseToken = await apiInstance.post(`login`, body);
    return [false, responseToken];
  } catch (error) {
    return [error, null];
  }
};

//user_details_with_token;
export const userDetailsApi = async () => {
  try {
    const response = await apiInstance.get(`auth-user`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};
