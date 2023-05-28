import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { dialogError } from "../hook";

const service = axios.create({
  baseURL: "/api",
});
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const apiKey = sessionStorage.getItem("api-key");
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }
  return config;
});
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    const status = error.response.status;
    if (status === 401) {
      dialogError("API_KEY失效，請重新綁定");
    }
    return Promise.reject(error);
  }
);
export default service;
