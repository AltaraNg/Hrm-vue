<template>
  <div
    class="font-outfit flex flex-col h-screen justify-between p-5 bg-sidebar-bg"
  >
    <div class="mt-4">
      <div class="font-thin my-3">
        <span class="subtitle">Get Started</span>
      </div>
      <div class="my-3">
        <RouterLink to="index" :active-class="'text-altara-blue font-bold'">
          <span class="mr-3"
            ><img src="../assets/element-equal.svg" class="inline" alt="icon"
          /></span>
          Dashboard
        </RouterLink>
      </div>

      <div class="mt-10">
        <div class="mb-2"><span class="subtitle">Activities</span></div>
        <ul class="flex flex-col">
          <li class="my-2">
            <RouterLink
              :to="'roles'"
              :active-class="'text-altara-blue font-bold'"
            >
              <img
                src="../assets/profile-circle.svg"
                class="inline mr-3"
              />Roles
            </RouterLink>
          </li>
          <li class="my-2">
            <RouterLink
              :to="'permissions'"
              :active-class="'text-altara-blue font-bold'"
            >
              <img src="../assets/guard.svg" class="inline mr-3" />Permissions
            </RouterLink>
          </li>
          <li class="my-2">
            <RouterLink
              :to="'people'"
              :active-class="'text-altara-blue font-bold'"
              ><img
                src="../assets/note-add.svg"
                class="inline mr-3"
              />Employees</RouterLink
            >
          </li>
          <li class="my-2">
            <RouterLink
              to="accounting"
              :active-class="'text-altara-blue font-bold'"
              ><img
                src="../assets/award.svg"
                class="inline mr-3"
              />Accounting</RouterLink
            >
          </li>
          <!-- <li class="my-2">
            <RouterLink
              to="settings"
              :active-class="'text-altara-blue font-bold'"
              ><img
                src="../assets/setting-2.svg"
                class="inline mr-3"
              />Settings</RouterLink
            >
          </li> -->
        </ul>
      </div>
    </div>

    <div class="justify-self-end">
      <button
        class="bg-altara-blue text-white px-7 py-1 rounded-md text-sm"
        @click="auth.logout"
      >
        LogOut
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>

<style scoped>
.subtitle {
  font-weight: 400;
  letter-spacing: 0.5em;
  line-height: 13px;
  text-transform: uppercase;
  font-size: 10px;
}
</style>
