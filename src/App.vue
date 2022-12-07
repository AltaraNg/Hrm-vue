<script setup lang="ts">
import { RouterView } from "vue-router";
import LoaderVue from "./components/LoaderVue.vue";
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div class="bg-white">
    <LoaderVue></LoaderVue>
    <RouterView />
    <ModalsContainer></ModalsContainer>
  </div>
</template>

<style scoped></style>
