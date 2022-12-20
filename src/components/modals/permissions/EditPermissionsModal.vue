<template>
  <vue-final-modal
    v-bind="$attrs"
    classes="mx-auto bg-white h-fit  my-3 w-2/5 rounded-lg"
    content-class="modal-content"
    v-slot="{ close }"
  >
    <div class="font-bold bg-altara-blue text-white p-2 flex justify-between">
      <span class="font-bold bg-altara-blue text-white">Edit Permission</span>
      <span
        class="text-xl font-outfit font-bold cursor-pointer mx-3"
        @click="close"
        >&times;</span
      >
    </div>
    <div class="p-3 relative ml-2">
      <FormKit
        autocomplete="on"
        type="form"
        id="create-permission"
        :actions="false"
        @submit="onSubmit"
        :classes="{
          message: 'text-red-500 text-xs',
        }"
      >
        <FormKit
          name="permissionName"
          type="text"
          label="Permission"
          validation="required"
          v-model="permissionItem.name"
          :classes="{
            outer: 'w-full',
            label: 'block font-outfit text-sm',

            inner:
              'border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500 w-full',
            input:
              'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
            help: 'text-xs text-gray-500',
            message: 'text-red-500 text-xs',
          }"
        ></FormKit>

        <div class="my-5 text-right">
          <button
            class="bg-altara-blue text-white p-2 rounded-md mx-2 text-sm"
            type="reset"
          >
            Cancel
          </button>
          <button
            class="bg-altara-blue text-white p-2 rounded-md text-sm"
            type="submit"
          >
            Submit
          </button>
        </div>
      </FormKit>
    </div>
  </vue-final-modal>
</template>

<script setup lang="ts">
import { put } from "@/api/client";
import { createToast } from "mosha-vue-toastify";
import { $vfm } from "vue-final-modal";
import { ref } from "vue";

const permissionItem = ref($vfm.dynamicModals[0].params.item);

const emit = defineEmits(["cancel"]);
async function onSubmit(data: any) {
  return await put(`/api/permissions/${permissionItem.value.id}`, {
    name: data.permissionName,
  }).then(() => {
    createToast("Permission Updated Successfully", {
      position: "top-left",
      type: "success",
    });
    emit("cancel");
    $vfm.hide("VEditPermissionModal").then(() => {});
  });
}
</script>

<style scoped></style>
