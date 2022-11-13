import axios from "axios";
import { useAuthStore } from "@/stores/auth";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const auth = useAuthStore();
export const get = (url: string) =>
  instance({
    method: "GET",
    url,
    headers: { Authorization: `Bearer ${auth.user?.api_token}` },
  });
export const post = (url: string, data: object) => {
  console.log(auth);
  return instance({
    method: "POST",
    url,
    data,
    headers: { Authorization: `Bearer ${auth?.user.api_token}` },
  });
};

export const interceptors = (cb) =>
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      cb(err);
      return Promise.reject(err);
    }
  );
