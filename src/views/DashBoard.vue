<template>
  <div class="flex flex-row h-screen text-sm">
    <SideNav class="p-10 bg-sidebar-bg"></SideNav>
    <div class="w-5/6 pl-6">
      <DashboardHeader class=""></DashboardHeader>
      <hr class="border-slate-50 mb-5" />
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideNav from "@/components/SideNav.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
</script>

<style lang="scss" scoped></style>
