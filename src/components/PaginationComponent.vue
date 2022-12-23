<template>
  <div class="py-2 font-outfit">
    <div class="flex justify-between">
      <div></div>
      <div class="flex">
        <span
          class="mx-2 text-gray-500"
          :class="{
            'hover:cursor-pointer text-black': pageInfo.previousPageUrl,
          }"
          @click="pageInfo.previousPageUrl ? $emit('previous') : ''"
          >Previous</span
        >
        <span class="mx-2 bg-orange-400 px-2">{{ pageInfo.currentPage }}</span>
        <span
          class="mx-2 text-gray-500"
          :class="{ 'hover:cursor-pointer text-black': pageInfo.nextPageUrl }"
          @click="pageInfo.nextPageUrl ? $emit('next') : ''"
          >Next</span
        >
      </div>
      <div>{{ `${pageInfo.currentPage}/${pageInfo.lastPage}` }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  pageInfo?: any;
}>();
// const perPage = ref(props.pageInfo.perPage);
</script>

<style scoped></style>
