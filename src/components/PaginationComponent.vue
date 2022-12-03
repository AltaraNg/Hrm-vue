<template>
  <div class="py-2">
    <div class="flex justify-between">
      <div>perPage</div>
      <div class="flex">
        <span class="mx-2">Previous</span>
        <span class="mx-2 bg-orange-400 px-2">{{ pageInfo.currentPage }}</span>
        <span class="mx-2">Next</span>
      </div>
      <div>{{ `${pageInfo.currentPage}/${pageInfo.lastPage}` }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pageInfo?: any;
}>();
</script>

<style scoped></style>
