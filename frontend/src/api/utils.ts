import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const authInterceptor = (req: any) => {
  const accessToken = JSON.parse(
    localStorage.getItem("profile") || "",
  )?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};
export const API = axios.create({
  baseURL: BASE_URL,
});
export const AUTHENTICATED_API = axios.create({
  baseURL: BASE_URL,
});
AUTHENTICATED_API.interceptors.request.use(authInterceptor);
