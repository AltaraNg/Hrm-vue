<template>
  <div class="flex flex-row h-screen">
    <SideNav class="p-10 bg-sidebar-bg"></SideNav>
    <div class="w-5/6 pl-6 py-2">
      <DashboardHeader class="my-2"></DashboardHeader>
      <hr />
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import SideNav from "@/components/SideNav.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
const auth = useAuthStore();
</script>

<style lang="scss" scoped></style>
