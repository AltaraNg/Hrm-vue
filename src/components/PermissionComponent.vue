<template>
  <div
    class="inline hover:cursor-pointer my-2 font-outfit"
    @click="toggleCheck(permission)"
  >
    <span
      class="mx-2 p-2 rounded-xl unchecked mb-5"
      :class="{
        'bg-altara-blue-solar border-altara-blue-solar-border font-semibold':
          checked,
      }"
    >
      {{ permission.name }}
      <img
        src="@/assets/check_icon.svg"
        alt="check"
        v-show="checked"
        class="inline"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  permission?: any;
}>();
const emit = defineEmits(["selected", "deselected"]);
const checked = ref(false);
const toggleCheck = (perm: any) => {
  checked.value = !checked.value;
  checked.value ? emit("selected", perm) : emit("deselected", perm);
};
</script>

<style scoped>
.unchecked {
  background-color: rgba(226, 223, 255, 1);
}
</style>
