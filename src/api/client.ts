import axios from "axios";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
 

});

export const get = (url: string) =>
  instance({
    method: "GET",
    url,
    headers: {
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${auth.token}`,
    }

  });
export const post = (url: string, data: object) => {
  return instance({
    method: "POST",
    url,
    data,
    headers: {
      'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${auth.token}`,
    }
  });
};

instance.interceptors.response.use(function (response){
  return response;
}, function(error){
  console.log(error.response.status)
  if(error.response.status === 401){
    useAuthStore().logout();
  }
})

export const interceptors = (cb: any) =>
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      cb(err);
      console.log(err.response.status)
      
      return Promise.reject(err);
    }
  );
