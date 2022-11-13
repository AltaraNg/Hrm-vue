<template>
  <div></div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

const logOut = () => {
  auth.logout();
};
</script>

<style lang="scss" scoped></style>
