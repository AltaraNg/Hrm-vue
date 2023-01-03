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
const props = defineProps<{
  permission?: any;
  checked?: boolean;
}>();
const emit = defineEmits(["selected", "deselected"]);
const toggleCheck = (perm: any) => {
  props.checked === false ? emit("selected", perm) : emit("deselected", perm);
};
</script>

<style scoped>
.unchecked {
  background-color: rgba(226, 223, 255, 1);
}
</style>
