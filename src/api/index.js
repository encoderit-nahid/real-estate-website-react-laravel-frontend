import axios from "axios";
import { _baseURL } from "../../consts";

const baseURL = `${_baseURL}/api`;

export const apiInstance = axios.create({
  baseURL: baseURL,
});
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

//login
export const loginApi = async (body) => {
  try {
    const responseToken = await apiInstance.post(`login`, body);
    return [false, responseToken];
  } catch (errorToken) {
    return [errorToken, null];
  }
};

//register
export const registrationApi = async (body) => {
  try {
    const responseToken = await apiInstance.post(`register`, body);
    return [false, responseToken];
  } catch (errorToken) {
    return [errorToken, null];
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

//find_state
export const stateApi = async () => {
  try {
    const response = await apiInstance.get(`state`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//find_property_type
export const propertyTypeApi = async () => {
  try {
    const response = await apiInstance.get(`property/property-type`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//find_features
export const featuresApi = async () => {
  try {
    const response = await apiInstance.get(`feature/index`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//best_deals_state
export const bestDealsApi = async () => {
  try {
    const response = await apiInstance.get(`/property/best-deals`);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//proposal_create
export const createProposalApi = async (body) => {
  try {
    const response = await apiInstance.post(`proposal/store`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};

//schedule_create
export const createScheduleApi = async (body) => {
  try {
    const response = await apiInstance.post(`schedule/create`, body);
    return [false, response];
  } catch (error) {
    return [error, null];
  }
};
