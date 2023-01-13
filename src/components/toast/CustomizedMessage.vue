<template>
  <div class="font-outfit text-white font-bold">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
