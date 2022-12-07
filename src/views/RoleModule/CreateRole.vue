<template>
  <div class="h-screen">
    <div class="bg-altara-blue text-white flex py-3 px-3">
      <span class="cursor-pointer" @click="$router.go(-1)"
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
          outer: 'h-screen',
          inner: 'h-screen',
        }"
      >
        <FormKit
          type="text"
          label="Role"
          validation="required"
          v-model="roleName"
          :classes="{
            outer: 'w-2/5',
            label: 'block font-outfit text-sm',

            inner:
              'border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500 w-full',
            input:
              'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
            help: 'text-xs text-gray-500',
            message: 'text-red-500 text-xs',
          }"
        ></FormKit>
        <div class="my-4">
          <PermissionComponent
            v-for="(permission, index) in permissions"
            :permission="permission.name"
            :key="index"
          ></PermissionComponent>
        </div>
        <div class="my-10">
          <button class="bg-altara-blue text-white p-2 rounded-md mx-2 text-sm">
            Cancel
          </button>
          <button class="bg-altara-blue text-white p-2 rounded-md text-sm">
            Create Role
          </button>
        </div>
      </FormKit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { get, post } from "@/api/client";
import { createToast } from "mosha-vue-toastify";
import PermissionComponent from "@/components/PermissionComponent.vue";
const permissions = ref();
const roleName = ref("");

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


const submitRequest = () => {
  post("/api/roles", { name: roleName.value }).then;
};

fetchPermissions();
</script>

<style scoped></style>
