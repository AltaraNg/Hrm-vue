<template>
  <div class="h-screen">
    <div class="bg-altara-blue text-white flex py-3 px-3">
      <span
        ><img src="@/assets/back_icon.svg" alt="back_icon" class="inline"
      /></span>
      <h3 class="mx-auto">Create Role</h3>
    </div>
    <div class="p-3">
      <FormKit
        autocomplete="on"
        type="form"
        id="create-role"
        :actions="false"
        :classes="{
          message: 'text-red-500 text-xs',
        }"
      >
        <FormKit
          type="text"
          label="Role"
          validation="required"
          :classes="{
            outer: 'w-1/2',
            label: 'block font-outfit text-sm',

            inner:
              'border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500 w-full',
            input:
              'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
            help: 'text-xs text-gray-500',
            message: 'text-red-500 text-xs',
          }"
        ></FormKit>
        <div>List of perrmisions</div>
        <div class="absolute right-0 bottom-0">
          <button>Cancel</button>
          <button>Create Role</button>
        </div>
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { get } from "@/api/client";
import { createToast } from "mosha-vue-toastify";
const permissions = ref();

const fetchPermissions = () => {
  get("/api/permissions")
    .then((res) => {
      permissions.value = res.data.data.permissions;
    })
    .catch((err) => {
      createToast(err.response.data.message, {
        position: "top-left",
        type: "danger",
      });
    });
};
fetchPermissions();
</script>

<style scoped></style>
