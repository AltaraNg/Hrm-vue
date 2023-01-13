import { createRouter, createWebHistory } from "vue-router";
import StaffLogin from "@/views/StaffLogin.vue";
import { useAuthStore } from "@/stores/auth";

const DashBoard = () => import("@/views/DashBoard.vue");
const Roles = () => import("@/views/RoleModule/RolesView.vue");
const Permissions = () => import("@/views/RoleModule/PermissionsView.vue");

const Accounting = () => import("@/views/AccountingView.vue");
const People = () => import("@/views/PeoplesView.vue");
const Settings = () => import("@/views/SettingsView.vue");
const Index = () => import("@/views/IndexView.vue")


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: DashBoard,
      children: [
        {
          path: "index",
          component: Index,
          name: "Index"
        },
        {
          path: "roles",
          component: Roles,
          name: "Roles"
        },
        {
          path: "permissions",
          component: Permissions,
          name: "Permissions"
        },
        {
          path: "people",
          component: People,
          name: "People"

        },
        {
          path: "accounting",
          component: Accounting,
          name: "Accounting"

        },
        {
          path: "settings",
          component: Settings,
          name: "Settings"

        },
        {
          path: '',
          redirect: 'roles'
        }
      ]
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
  if (authRequired && !auth.token) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
  if (to.fullPath === '/login' && auth.token) {
    return '/';
  }
})

export default router;
