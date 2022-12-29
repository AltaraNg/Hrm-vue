<template>
  <vue-final-modal
    v-bind="$attrs"
    classes="mx-auto bg-white h-fit my-auto w-5/12 rounded-lg font-outfit"
    content-class="modal-content"
    v-slot="{ close }"
    :z-index-base="1"
  >
    <div class="font-bold bg-altara-blue text-white p-2 flex justify-between">
      <span class="font-bold bg-altara-blue text-white">Create Permission</span>
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
import { post } from "@/api/client";
import { useGeneralStore } from "@/stores/generalStore";
import { createToast } from "mosha-vue-toastify";
import { $vfm } from "vue-final-modal";
const emit = defineEmits(["cancel"]);
async function onSubmit(data: any) {
  useGeneralStore().toggleLoader(true);
  try {
    let res = await post("/api/permissions", { name: data.permissionName });
    if (res) {
      createToast("Permission Added Successfully", {
        position: "top-left",
        type: "success",
      });
      emit("cancel");
      $vfm.hide("VCreatePermissionModal").then(() => {});
    } else {
      createToast("Permission already exists", {
        position: "top-left",
        type: "danger",
      });
    }
    useGeneralStore().toggleLoader(false);
  } catch (error) {
    useGeneralStore().toggleLoader(false);
  }

  // .then(() => {
  //   createToast("Permission Added Successfully", {
  //     position: "top-left",
  //     type: "success",
  //   });
  //   emit("cancel");
  //   $vfm.hide("VCreatePermissionModal").then(() => {});
  // })
  // .catch((err) => {
  //   if (err.response.status === 422) {
  //     console.log(err);
  //   }
  // });
}
</script>

<style scoped></style>
