import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";


const base_url = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),

    actions: {
        async signin(staffId: string, password: string) {
            return axios.post(`${base_url}/auth/login`, { staff_id: staffId, password: password }).then((res: any) => {
                this.user = res.data;
                localStorage.setItem('user', JSON.stringify(this.user));
                createToast("Login Successful", {
                    position: "top-left",
                    type: "success",
                  });
                router.push(this.returnUrl || '/');
            }).catch((err: any) => {
                createToast(err.response.data.message, {
                    position: "top-left",
                    type: "danger",
                  });
                 
            });
           
        },
        logout() {
            return axios(
                {
                    url: `${base_url}/logout`,
                    method: 'POST',
                    headers: { Authorization: `Bearer ${this.user.api_token}` }
                }).then(res => {
                    this.user = null;
                    createToast("Logged oout successfully", {
                        position: "top-left",
                        type: "success",
                      });

                    localStorage.removeItem('user');
                    router.push('/login');
                })

        }
    }
})