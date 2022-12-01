import axios from "axios";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Access-Control-Allow-Credentials': true,
    Authorization: `Bearer ${auth.token}`,
  }

});

export const get = (url: string) =>
  instance({
    method: "GET",
    url,

  });
export const post = (url: string, data: object) => {
  return instance({
    method: "POST",
    url,
    data,
  });
};

export const interceptors = (cb: any) =>
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      cb(err);
      return Promise.reject(err);
    }
  );
