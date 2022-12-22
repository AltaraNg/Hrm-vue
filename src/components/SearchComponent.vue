<template>
  <div class="font-outfit">
    <div class="flex">
      <div
        class="px-2 py-2 bg-sidebar-bg mx-2 rounded-lg hover:cursor-pointer"
        @click="toggleModal"
      >
        Filter By
        <img src="@/assets/filter_icon.svg" alt="filter" class="inline ml-3" />
      </div>
      <div v-for="(item, index) in inputList" :key="index" class="mx-1">
        <input
          class="w-fit px-2 py-2 border-none text-gray-700 placeholder-gray-400 bg-sidebar-bg rounded-sm"
          v-if="item.type === 'text'"
          type="text"
          :placeholder="item.name"
        />
        <select
          v-else-if="item.type === 'select'"
          class="w-fit px-2 py-2 border-none text-gray-700 placeholder-gray-400 bg-sidebar-bg rounded-sm"
        >
          <option
            v-for="(option, index) in item.options"
            :value="option"
            :key="index"
          >
            {{ option }}
          </option>
        </select>
      </div>

      <button
        class="bg-altara-blue py-2 rounded-lg text-white text-sm px-8"
        v-if="inputList"
      >
        Apply
      </button>
    </div>
    <div
      class="fixed pin z-50 overflow-auto flex right-30 mx-2 shadow-md w-fit"
      v-if="showModal"
    >
      <div class="relative p-2 bg-white w-fit">
        <div class="flex justify-between">
          <h4 class="text-altara-blue ml-3 mr-20 font-semibold">Filters</h4>
          <img
            src="@/assets/close_icon.svg"
            alt="close"
            class="block"
            @click="toggleModal"
          />
        </div>
        <div class="flex flex-col mt-4 mx-3">
          <label v-for="item in filterList" :key="item.id" class="block">
            <input type="checkbox" :value="item" v-model="inputList" />
            {{ item.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
defineProps<{
  filterList?: any;
}>();

const showModal = ref(false);
const inputList: {
  name?: string;
  options?: [];
  type?: string;
}[] = reactive([] || "");
const inputModel = ref();

const toggleModal = function () {
  showModal.value = !showModal.value;
};
</script>

<style scoped></style>
