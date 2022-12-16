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
  post("/api/roles", {
    name: data.roleName,
    permissions: permissionsList,
  })
    .then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        createToast("Role Added Successfully", {
          position: "top-left",
          type: "success",
        });
        emit("cancel");
        $vfm.hide("VCreateRolesModal").then(() => {});
      } else {
        createToast(res.data.message, {
          position: "top-left",
          type: "danger",
        });
      }
    })
    .catch((err) => {
      createToast(err.data.message, {
        position: "top-left",
        type: "danger",
      });
    });
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
