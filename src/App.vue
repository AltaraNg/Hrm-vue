<script setup lang="ts">
// @ts-nocheck
import { RouterView } from "vue-router";
import { ModalsContainer } from "vue-final-modal";
import LoaderVue from "./components/LoaderVue.vue";
</script>

<template>
  <div class="bg-white">
    <LoaderVue></LoaderVue>
    <RouterView />
    <ModalsContainer></ModalsContainer>
  </div>
</template>

<style scoped></style>
