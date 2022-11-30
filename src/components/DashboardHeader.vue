<template>
  <div class="flex justify-between font-outfit">
    <div>
      <img src="../assets/altara_log.png" alt="logo" width="120" height="100" />
    </div>
    <div class="flex">
      <div class="mx-2"><font-awesome-icon icon="fa-solid fa-bell"></font-awesome-icon></div>
      <span class="rounded border px-2">AA</span>
      {{ user.user_name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const user = ref(auth.user);
</script>

<style scoped></style>
