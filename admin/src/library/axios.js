
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let tokenGetter = null;

export const setTokenGetter = (getter) => {
  tokenGetter = getter;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (tokenGetter) {
      const token = await tokenGetter();

      if (typeof token === "string" && token.length > 0) {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        config.headers.delete("Authorization");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
