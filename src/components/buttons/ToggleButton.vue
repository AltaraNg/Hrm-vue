<template>
  <div>
    <div class="flex items-center justify-center w-full mb-1">
      <label for="toggleB" class="flex items-center cursor-pointer">
        <!-- toggle -->
        <div class="relative">
          <!-- input -->
          <input
            @click="$emit('clicked')"
            type="checkbox"
            id="toggleB"
            class="sr-only"
            :checked="initialVal"
          />
          <!-- line -->
          <div class="block bg-altara-blue w-8 h-4 rounded-full"></div>
          <!-- dot -->
          <div
            class="dot absolute left-0 top-0 bg-gray-100 outline-altara-blue w-4 h-4 rounded-full transition"
          ></div>
        </div>
        <!-- label -->
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  initialVal: {
    type: Boolean,
    default: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

</script>

<style scoped></style>
