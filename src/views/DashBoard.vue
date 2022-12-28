<template>
  <div class="flex flex-row h-screen text-sm">
    <ModalsContainer></ModalsContainer>

    <SideNav></SideNav>
    <div class="w-5/6 pl-6 bg-white h-screen">
      <DashboardHeader class=""></DashboardHeader>
      <hr class="border-slate-50 mb-5" />
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ModalsContainer } from "vue-final-modal";
import SideNav from "@/components/SideNav.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";
</script>

<style lang="scss" scoped></style>
