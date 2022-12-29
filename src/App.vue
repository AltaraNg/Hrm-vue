<script setup lang="ts">
import { RouterView } from "vue-router";
import LoaderVue from "./components/LoaderVue.vue";
</script>

<template>
  <div class="bg-white">
    <LoaderVue></LoaderVue>

    <RouterView />
  </div>
</template>

<style scoped></style>
