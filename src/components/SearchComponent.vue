<template>
  <div class="font-outfit">
    <div class="flex">
      <div class="bg-sidebar-bg rounded-lg">
        <input
          placeholder="Search..."
          type="search"
          name="search"
          class="mx-0 bg-sidebar-bg border-0 h-full py-2 px-2 focus:outline-none rounded-lg"
        />
        <img
          src="@/assets/search-normal.svg"
          class="inline mx-2 hover:cursor-pointer"
          alt="search-icon"
        />
      </div>
      <div class="px-2 py-2 bg-sidebar-bg mx-2 rounded-lg">
        Filter By
        <img
          src="@/assets/filter_icon.svg"
          alt="filter"
          class="inline ml-3 hover:cursor-pointer"
          @click="toggleModal"
        />
      </div>
    </div>
    <div
      class="fixed pin z-50 overflow-auto bg-smoke-light flex right-48 shadow-md"
      v-if="showModal"
    >
      <div class="relative p-2 bg-white w-full">
        <div class="flex">
          <h4 class="text-altara-blue ml-3 mr-32 font-semibold">Filters</h4>
          <img
            src="@/assets/close_icon.svg"
            alt="close" 
            class="mr-3"
            @click="toggleModal"
          />
        </div>
        <div class="flex flex-col mt-4 mx-3">
          <label v-for="item in filterList" :key="item.id" class="block">
            <input type="checkbox" :value="item.value" />
            {{ item.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineProps<{
  filterList?: any;
}>();

const showModal = ref(false);

const toggleModal = function () {
  showModal.value = !showModal.value;
};
</script>

<style scoped></style>
