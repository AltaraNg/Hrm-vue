<template>
  <div class="flex justify-between font-outfit">
    <div>
      <img src="../assets/altara_log.png" alt="logo" width="120" height="100" />
    </div>
    <div class="flex">
      <div class="mx-2 p-2">
        <font-awesome-icon
          icon="fa-solid fa-bell"
          class="text-lg"
        ></font-awesome-icon>
      </div>
      <span class="rounded-full border p-2">{{ avatar }}</span>
      <span class="p-2">{{ user.full_name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const user = ref(auth.user);
const avatar = computed(() => {
  let split = user.value.full_name.split(" ");

  return `${split[0].slice(0, 1)}${split[1].slice(0, 1)}`;
});
</script>

<style scoped></style>
