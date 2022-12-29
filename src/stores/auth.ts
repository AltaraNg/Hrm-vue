import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { createToast, withProps } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import CustomizedMessage from "../components/toast/CustomizedMessage.vue";

const base_url = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: JSON.parse(localStorage.getItem('token') || 'null'),
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        returnUrl: ""
    }),

    actions: {
        async signin(staffId: string, password: string) {
            await axios.post(`${base_url}/api/auth/login`, { staff_id: staffId, password: password }).then((res: any) => {
                let { user, token } = res.data?.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));
                this.user = user;
                this.token = token;
                createToast(withProps(CustomizedMessage, { message: "Login Successful" }), {
                    position: "top-left",
                    type: "success",
                });
                router.push(this.returnUrl || '/');
            }).catch((err: any) => {
                createToast(withProps(CustomizedMessage, { message: "Incorrect StaffId or Password entered" }), { type: "danger", position: "top-left" });
                return err;


            });

        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            router.push('/login');


        }
    }
})