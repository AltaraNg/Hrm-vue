<template>
  <div class="font-outfit">
    <div class="flex justify-between">
      <h3 class="font-bold text-lg text-altara-blue">Roles</h3>
      <div class="flex">
        <div class="mx-2">
          <SearchComponent :filter-list="filterList"></SearchComponent>
        </div>
        <div class="mx-2">
          <AddButton><template v-slot:title>Add Employee</template></AddButton>
        </div>
      </div>
    </div>
    <!--TODO ui for mobile-->
    <div class="sm:hidden"></div>
    <div
      class="hidden lg:block my-2 py-7 px-14 border rounded-md shadow-md w-full h-fit"
    >
      <table
        class="border-collapse rounded-t font-bold w-full my-table-spacing text-xs mb-10"
      >
        <thead class="bg-sidebar-bg text-table-text rounded">
          <tr class="">
            <th class="py-3">#</th>
            <th class="py-3">Roles</th>
            <th class="py-3">Permission</th>
            <th class="py-3">Status</th>
            <th class="py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="text-table-text text-center">
          <tr v-for="role in roles" :key="role.id">
            <td class="p-2 border border-t-0 border-l-0">{{ role.id }}</td>
            <td class="p-2 border border-t-0 w-1/4 text-left">
              {{ role.name }}
            </td>
            <td class="p-2 border border-t-0 text-left">
              {{ role.permissions }}
            </td>
            <td class="p-2 border border-t-0"><ToggleButton></ToggleButton></td>
            <td class="p-2 border border-t-0 border-r-0 w-1/5">
              <img
                src="@/assets/delete_icon.svg"
                alt="edit"
                class="inline mr-4 cursor-pointer"
              />
              <img
                src="@/assets/edit_icon.svg"
                alt="delte"
                class="inline ml-4 cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="absolute bottom-0 w-11/12">
        <PaginationComponent class=""></PaginationComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { get } from "@/api/client";
import { ref } from "vue";
import AddButton from "@/components/buttons/AddButton.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import ToggleButton from "@/components/buttons/ToggleButton.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

const roles = ref([]);
const filterList = ref([
  { id: 1, name: "Role Name", value: "name" },
  { id: 2, name: "Permission", value: "permision" },
  { id: 3, name: "Status", value: "name" },
]);
get("/roles?per_page=10").then((res) => {
  roles.value = res.data.data.roles;
});
</script>

<style scoped></style>
