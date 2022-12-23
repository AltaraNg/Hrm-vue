<template>
  <div>
    <div v-if="loading"></div>
    <div class="font-outfit" v-else>
      <div class="flex justify-between">
        <h3 class="font-bold text-lg text-altara-blue">Roles</h3>
        <div class="flex">
          <div class="mx-2">
            <SearchComponent
              :filter-list="filterList"
              @submit="searchQuery"
            ></SearchComponent>
          </div>
        </div>
      </div>
      <!--TODO ui for mobile-->
      <div class="sm:hidden"></div>
      <div
        class="hidden lg:block my-2 py-5 px-5 border rounded-md shadow-md w-full h-5/6"
      >
        <div class="mx-2 float-right my-2">
          <AddButton @click="showCreateModal"
            ><template v-slot:title>Add Role</template></AddButton
          >
        </div>
        <table
          class="border-collapse rounded-t font-bold w-full h-5/6 overflow-y-auto my-table-spacing text-sm mb-10"
        >
          <thead class="bg-sidebar-bg text-table-text rounded">
            <tr class="">
              <th class="py-3">#</th>
              <th class="py-3">Roles</th>
              <th class="py-3">Permissions</th>

              <th class="py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="text-table-text text-center">
            <tr v-for="(role, index) in roles" :key="index">
              <td class="p-2 border border-t-0 border-l-0">
                {{ OId + index }}
              </td>
              <td class="p-2 border border-t-0 w-1/4 text-left">
                {{ role.name }}
              </td>
              <td class="p-2 border border-t-0 text-left">
                {{ transformPerm(role.permissions) }}
              </td>

              <td class="p-2 border border-t-0 border-r-0 w-1/5">
                <img
                  src="@/assets/delete_icon.svg"
                  alt="edit"
                  class="inline mr-4 cursor-pointer"
                  @click="editRole(role)"
                />
                <img
                  src="@/assets/edit_icon.svg"
                  alt="delte"
                  class="inline ml-4 cursor-pointer"
                  @click="deleteRole(role)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="absolute bottom-0 w-11/12">
          <PaginationComponent
            @next="nextPage"
            @previous="previousPage"
            class=""
            :page-info="pageInfo"
          ></PaginationComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { get, del } from "@/api/client";
import { ref } from "vue";
import AddButton from "@/components/buttons/AddButton.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { $vfm } from "vue-final-modal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal.vue";
import CreateRolesModal from "@/components/modals/roles/CreateRolesModal.vue";
import { useGeneralStore } from "@/stores/generalStore";
import queryParams from "@/utilities/queryParams";
import { $emptyObject } from "@/utilities/globalFunctions";
import { useRouter, useRoute } from "vue-router";
import EditRolesModal from "@/components/modals/roles/EditRolesModal.vue";
import { truncate } from "lodash";

const router = useRouter();
const route = useRoute();
const roles = ref();
const pageInfo = ref();
const loading = ref(true);
const OId = ref(1);
const filterList = ref([
  { id: 1, name: "Role Name", value: "name", type: "text" },
  { id: 2, name: "Permission", value: "permission", type: "text" },
  {
    id: 3,
    name: "Status",
    value: "name",
    type: "select",
    options: ["active", "inactive"],
  },
]);

const fetchRoles = async () => {
  useGeneralStore().toggleLoader(true);
  await get("api/roles" + `?per_page=10`)
    .then((res) => {
      roles.value = res.data.data[0].roles;
      pageInfo.value = res.data.data[0].pagination;
      loading.value = false;
    })
    .catch((err) => {
      loading.value = false;
      createToast(err.response.data.message, {
        position: "top-left",
        type: "danger",
      });
    });
  useGeneralStore().toggleLoader(false);
};

const searchQuery = async (query: any) => {
  useGeneralStore().toggleLoader(true);
  await get("api/roles" + queryParams(query))
    .then((res) => {
      roles.value = res.data.data[0].roles;
      pageInfo.value = res.data.data[0].pagination;
      OId.value = (pageInfo.value.currentPage - 1) * 10 + 1;
      loading.value = false;
    })
    .catch((err) => {
      loading.value = false;
      createToast(err.response.data.message, {
        position: "top-left",
        type: "danger",
      });
    });
  useGeneralStore().toggleLoader(false);
};

const transformPerm = (perm: any) => {
  let list = perm.map((item: any) => item.name);
  return truncate(list.join(", "), {
    length: 100,
  });
};

const updateComponent = async function name() {
  useGeneralStore().toggleLoader(true);
  await get("api/roles" + queryParams(route.query))
    .then((res) => {
      roles.value = res.data.data[0].roles;
      pageInfo.value = res.data.data[0].pagination;
      OId.value = (pageInfo.value.currentPage - 1) * 10 + 1;
      loading.value = false;
    })
    .catch((err) => {
      loading.value = false;
      createToast(err.response.data.message, {
        position: "top-left",
        type: "danger",
      });
    });
  useGeneralStore().toggleLoader(false);
};

$emptyObject(route.query) ? fetchRoles() : updateComponent();

const nextPage = async () => {
  useGeneralStore().toggleLoader(true);

  let next = pageInfo.value.nextPageUrl.replace(
    "http://hrm-play-api.herokuapp.com/",
    ""
  );
  await get(next + `&per_page=10`)
    .then((res) => {
      roles.value = res.data.data[0].roles;
      pageInfo.value = res.data.data[0].pagination;
      loading.value = false;
      router.push({
        path: route.fullPath,
        query: { per_page: 10, page: pageInfo.value.currentPage },
      });
      OId.value = OId.value + pageInfo.value.perPage;
    })
    .catch((err) => {
      loading.value = false;
      createToast(err.response.data.message, {
        position: "top-left",
        type: "danger",
      });
    });
  useGeneralStore().toggleLoader(false);
};

const previousPage = async () => {
  useGeneralStore().toggleLoader(true);

  let prev = pageInfo.value.previousPageUrl.replace(
    "http://hrm-play-api.herokuapp.com/",
    ""
  );
  await get(prev + `&per_page=10`)
    .then((res) => {
      roles.value = res.data.data[0].roles;
      pageInfo.value = res.data.data[0].pagination;
      loading.value = false;
      router.push({
        path: route.fullPath,
        query: { per_page: 10, page: pageInfo.value.currentPage },
      });

      OId.value = OId.value - pageInfo.value.perPage;
    })
    .catch((err) => {
      loading.value = false;
      createToast(err.response.data.message, {
        position: "top-left",
        type: "danger",
      });
    });
  useGeneralStore().toggleLoader(false);
};

const deleteRole = (role: any) => {
  $vfm.show(
    {
      component: DeleteConfirmModal,
      bind: {
        name: "VConfirmDeleteModal",
      },
      on: {
        async confirm(param: any) {
          await del(`/api/roles/${param.item.id}`)
            .then((res) => {
              createToast(res.data.message, {
                position: "top-left",
                type: "success",
              });
              updateComponent();
              param.method();
            })
            .catch((err) => {
              createToast(err.data.message, {
                position: "top-left",
                type: "danger",
              });
            });
        },
        cancel(close: any) {
          close();
        },
      },
    },
    { name: "role", item: role }
  );
};

const editRole = (role: any) => {
  $vfm.show(
    {
      component: EditRolesModal,
      bind: {
        name: "VEditRolesModal",
      },
      on: {
        cancel() {
          fetchRoles();
        },
      },
    },
    { name: "role", item: role }
  );
};

const showCreateModal = () => {
  $vfm.show({
    component: CreateRolesModal,
    bind: {
      name: "VCreateRolesModal",
    },
    on: {
      cancel() {
        fetchRoles();
      },
    },
  });
};
</script>

<style scoped></style>
