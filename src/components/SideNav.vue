<template>
  <div class="font-outfit pt-12 flex flex-col">
    <div class="font-thin my-3"><span class="subtitle">Get Started</span></div>
    <div class="my-5">
      <span class="mr-3"
        ><img src="../assets/element-equal.svg" class="inline" alt="icon"
      /></span>
      Dashboard
    </div>

    <div class="my-10"><span class="subtitle">Activities</span></div>
    <ul class="flex flex-col">
      <li class="my-3">
        <a href="#"
          ><img
            src="../assets/profile-circle.svg"
            class="inline mr-3"
          />Roles</a
        >
      </li>
      <li class="my-3">
        <a href="#"
          ><img src="../assets/note-add.svg" class="inline mr-3" />People</a
        >
      </li>
      <li class="my-3">
        <a href="#"
          ><img src="../assets/award.svg" class="inline mr-3" />Accounting</a
        >
      </li>
      <li class="my-3">
        <a href="#">
          <img src="../assets/setting-2.svg" class="inline mr-3" />Settings</a
        >
      </li>
    </ul>
    <div class="absolute bottom-0">
      <button
        class="bg-altara-blue text-white mb-6 px-7 py-1 rounded-md text-sm"
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
