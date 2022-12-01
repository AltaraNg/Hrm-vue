import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import type { AnyAaaaRecord } from "dns";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

});

const auth = useAuthStore();
export const get = (url: string) =>
  instance({
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  });
export const post = (url: string, data: object) => {
  return instance({
    method: "POST",
    url,
    data,
    headers: {
      Authorization: `Bearer ${auth.token}`, 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
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
