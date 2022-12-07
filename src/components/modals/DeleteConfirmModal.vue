<template>
  <vue-final-modal
    v-bind="$attrs"
    classes="mx-auto bg-white h-fit my-auto w-fit rounded-lg font-outfit"
    content-class="modal-content"
    v-slot="{ params, close }"
  >
    <div
      class="font-bold bg-altara-blue text-white p-2 flex justify-between rounded-t-md"
    >
      <span class="font-medium bg-altara-blue text-white"
        >Delete <span class="capitalize">{{ params.name }}</span></span
      >
      <span
        class="text-xl font-outfit font-bold cursor-pointer mx-3"
        @click="close"
        >&times;</span
      >
    </div>
    <div class="p-3 relative ml-2 text-center">
      <div class="my-3">
        <img src="@/assets/warning_icon.svg" alt="warning" class="mx-auto" />
      </div>
      <div class="my-3">
        <h3 class="font-bold text-xl">
          Are you sure you want to delete this {{ params.name }}?
        </h3>
        <p class="text-xs my-1">
          This
          {{ params.name }} will be deleted immediately. You can’t undo this
          action
        </p>
      </div>
      <div class="text-right mt-5 text-sm">
        <button
          @click="$emit('cancel', close)"
          class="p-2 bg-altara-blue-solar-border text-altara-blue mx-2 rounded-md"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm', { method: close, item: params.item })"
          class="p-2 bg-altara-blue text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { post } from "@/api/client";
import { createToast } from "mosha-vue-toastify";
import { ref } from "vue";
import { $vfm } from "vue-final-modal";
async function onSubmit(data: any) {
  console.log(data);
  return await post("/api/permissions", { name: data.permissionName }).then(
    (res) => {
      createToast("Permission Added Successfully", {
        position: "top-left",
        type: "success",
      });
      $vfm.toggle("createPermissionModal");
    }
  );
}
</script>

<style scoped></style>
