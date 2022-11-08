import { createRouter, createWebHistory } from "vue-router";
import StaffLogin from "@/views/StaffLogin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: StaffLogin
    }
  ],
});

export default router;
