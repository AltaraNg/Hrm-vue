<template>
  <div class="flex justify-between font-outfit">
    <div class="self-center">
      <img src="../assets/altara_log.png" alt="logo" width="75" height="50" />
    </div>
    <div class="flex">
      <div class="mx-2 px-2 self-center">
        <!-- <font-awesome-icon
          icon="fa-solid fa-bell"
          class="text-xs"
        ></font-awesome-icon> -->
      </div>
      <div class="rounded-full border text-xs self-center p-2">
        {{ avatar }}
      </div>
      <div class="p-2 text-xs">
        <div class="font-bold">{{ user.full_name }}</div>
        <div class="text-xs">Software Engineer</div>
      </div>
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
