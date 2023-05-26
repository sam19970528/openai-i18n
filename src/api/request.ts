import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { dialogError } from "../hook";

// const apiKey = "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";
const service = axios.create({
  baseURL: "/api",
});
// service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   config.headers.Authorization = `Bearer ${apiKey}`;
//   return config;
// });
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
