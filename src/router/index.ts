import { createRouter, createWebHistory } from "vue-router";
import StaffLogin from "@/views/StaffLogin.vue";
import { useAuthStore } from "@/stores/auth";

const DashBoard = () => import("@/views/DashBoard.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: DashBoard
    },
    {
      path: "/login",
      name: "login",
      component: StaffLogin
    }
  ],
});

router.beforeEach(async (to, from) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  if(authRequired && !auth.user?.auth){
    auth.returnUrl = to.fullPath;
    return '/login';
  }
})

export default router;
