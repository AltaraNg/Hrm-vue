import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";


const base_url = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: JSON.parse(localStorage.getItem('token') || '{}'),
        user: JSON.parse(localStorage.getItem('user') || '{}'),
        returnUrl: ""
    }),

    actions: {
        async signin(staffId: string, password: string) {
            axios.post(`${base_url}/api/auth/login`, { staff_id: staffId, password: password }).then((res: any) => {
                let { user, token } = res.data?.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));
                this.user = user;
                this.token = token;
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
                    url: `${base_url}/api/auth/logout`,
                    method: 'POST',
                    headers: { Authorization: `Bearer ${this.token}` }
                }).then(res => {
                    this.token = null;
                    this.user = null;
                    createToast("Logged out successfully", {
                        position: "top-left",
                        type: "success",
                    });

                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    router.push('/login');
                })

        }
    }
})