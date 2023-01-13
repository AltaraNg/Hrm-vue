<template>
  <div class="h-screen">
    <ModalsContainer></ModalsContainer>
    <div class="sticky w-2/12 float-left h-full bg-sidebar-bg">
      <SideNav></SideNav>
    </div>

    <div class="w-10/12 px-5 bg-white overflow-y-auto float-right h-full">
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
