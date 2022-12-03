<script setup lang="ts">
import { RouterView } from "vue-router";
import LoaderVue from "./components/LoaderVue.vue";
</script>

<template>
  <LoaderVue></LoaderVue>
  <RouterView />
</template>

<style scoped></style>
