<script setup lang="ts">
import { RouterView } from "vue-router";
import LoaderVue from "./components/LoaderVue.vue";
</script>

<template>
  <div class="bg-white">
    <LoaderVue class="z-50"></LoaderVue>

    <RouterView />
  </div>
</template>

<style scoped></style>
