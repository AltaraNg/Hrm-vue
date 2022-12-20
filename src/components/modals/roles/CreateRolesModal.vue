<template>
  <vue-final-modal
    v-bind="$attrs"
    classes="mx-auto bg-white h-fit  my-3 w-2/5 rounded-lg"
    content-class="modal-content"
    v-slot="{ close }"
  >
    <div
      class="font-bold bg-altara-blue text-white p-2 flex justify-between rounded-t-md"
    >
      <span class="font-bold bg-altara-blue text-white">Create Role</span>
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
          name="roleName"
          type="text"
          label="Role"
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
        <div class="my-4 flex flex-wrap">
          <PermissionComponent
            @selected="addToPermission"
            @deselected="removeFromPermission"
            v-for="(permission, index) in permissions"
            :permission="permission"
            :key="index"
          ></PermissionComponent>
        </div>

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
import { get, post } from "@/api/client";
import { ref, reactive } from "vue";
import { $vfm } from "vue-final-modal";
import { createToast } from "mosha-vue-toastify";
import PermissionComponent from "@/components/PermissionComponent.vue";
import { useGeneralStore } from "@/stores/generalStore";

const emit = defineEmits(["cancel"]);
const permissions = ref();
const permissionsList = reactive([1]);

permissionsList.splice(0, 1);
const fetchPermissions = () => {
  get("/api/permissions")
    .then((res) => {
      permissions.value = res.data.data[0].permissions;
    })
    .catch((err) => {
      createToast(err.response.data.message, {
        position: "top-left",
        type: "danger",
      });
    });
};
fetchPermissions();

const onSubmit = async (data: any) => {
  useGeneralStore().toggleLoader();
  try {
    let res = await post("/api/roles", {
      name: data.roleName,
      permissions: permissionsList,
    });
    if (res) {
      createToast("Role Successfully created", {
        position: "top-left",
        type: "success",
      });
      $vfm.hide("VCreateRolesModal").then(() => {});

      emit("cancel");
    } else {
      createToast("There is an error in your request", {
        position: "top-left",
        type: "danger",
      });
    }
  } catch (error: any) {
    // Error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }

  useGeneralStore().toggleLoader();
};

const addToPermission = (perm: any) => {
  permissionsList.push(perm.id);
};
const removeFromPermission = (perm: any) => {
  let index = permissionsList.indexOf(perm.id);
  index > -1 ? permissionsList.splice(index, 1) : "";
};
</script>

<style scoped></style>
