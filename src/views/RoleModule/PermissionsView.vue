<template>
  <div>
    <div v-if="loading"></div>
    <div class="font-outfit" v-else>
      <div class="flex justify-between">
        <h3 class="font-bold text-lg text-altara-blue">Permissions</h3>
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
        class="hidden lg:block my-2 py-7 px-14 border rounded-md shadow-md w-full h-fit"
        v-if="permissions.length > 0"
      >
        <div class="mx-2 float-right my-2">
          <AddButton @click="showCreateModal"
            ><template v-slot:title>Add Permissions</template></AddButton
          >
        </div>
        <table
          class="border-collapse rounded-t font-bold w-full h-5/6 overflow-y-auto my-table-spacing text-sm mb-10"
        >
          <thead class="bg-sidebar-bg text-table-text rounded">
            <tr class="">
              <th class="py-3">#</th>
              <th class="py-3">Permission</th>
              <th class="py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="text-table-text text-center">
            <tr v-for="(permission, index) in permissions" :key="index">
              <td class="p-2 border border-t-0 border-l-0">
                {{ OId + index }}
              </td>
              <td class="p-2 border border-t-0 text-left">
                {{ permission.name }}
              </td>

              <td class="p-2 border border-t-0 border-r-0 w-1/5">
                <img
                  src="@/assets/delete_icon.svg"
                  alt="edit"
                  class="inline mr-4 cursor-pointer"
                  @click="editPermission(permission)"
                />
                <img
                  src="@/assets/edit_icon.svg"
                  alt="delte"
                  class="inline ml-4 cursor-pointer"
                  @click="deletePermission(permission)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="absolute bottom-0 w-11/12">
          <PaginationComponent
            @fetchPage="fetchPage"
            @next="nextPage"
            @previous="previousPage"
            :page-info="pageInfo"
          ></PaginationComponent>
        </div>
      </div>
      <div v-else class="hidden lg:block my-2 py-2 w-full">
        <div class="mx-2 float-right">
          <AddButton @click="showCreateModal"
            ><template v-slot:title>Add Permissions</template></AddButton
          >
        </div>
        <img src="@/assets/zero_state.svg" alt="zero-state" class="mx-auto" />
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
import { createToast, withProps } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import { $vfm } from "vue-final-modal";
import { useGeneralStore } from "@/stores/generalStore";
import queryParams from "@/utilities/queryParams";
import { $emptyObject } from "@/utilities/globalFunctions";
import createPermissionModal from "@/components/modals/permissions/createPermissionModal.vue";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal.vue";
import { useRoute, useRouter } from "vue-router";
import EditPermissionsModal from "@/components/modals/permissions/EditPermissionsModal.vue";
import CustomizedMessage from "@/components/toast/CustomizedMessage.vue";

const permissions = ref();
const router = useRouter();
const route = useRoute();
const pageInfo = ref();
const loading = ref(true);
const OId = ref(1);
const filterList = ref([
  { id: 1, name: "Permission", value: "name", type: "text" },
]);

const fetchPermissions = async () => {
  useGeneralStore().toggleLoader(true);

  await get("api/permissions" + "?per_page=10")
    .then((res) => {
      OId.value = 1;
      permissions.value = res.data.data[0].permissions;
      pageInfo.value = res.data.data[0].pagination;
      loading.value = false;
      router.push({
        path: route.fullPath,
        query: { per_page: 10 },
      });
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
  await get("api/permissions" + queryParams(query))
    .then((res) => {
      permissions.value = res.data.data[0].permissions;
      pageInfo.value = res.data.data[0].pagination;
      OId.value = (pageInfo.value.currentPage - 1) * 10 + 1;
      loading.value = false;
      router.push({
        path: route.fullPath,
        query: { per_page: 10, ...query },
      });
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

const updateComponent = async function name() {
  useGeneralStore().toggleLoader(true);
  await get("api/permissions" + queryParams(route.query))
    .then((res) => {
      permissions.value = res.data.data[0].permissions;
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

const showCreateModal = () => {
  $vfm.show({
    component: createPermissionModal,
    bind: {
      name: "VCreatePermissionModal",
    },
    on: {
      cancel() {
        fetchPermissions();
      },
    },
  });
};

const deletePermission = (permission: any) => {
  $vfm.show(
    {
      component: DeleteConfirmModal,
      bind: {
        name: "VConfirmDeleteModal",
      },
      on: {
        confirm(param: any) {
          del(`/api/permissions/${param.item.id}`).then((res) => {
            createToast(withProps(CustomizedMessage, { message: "Deleted Successfully" }), {
              position: "top-left",
              type: "success",
            });
            updateComponent();
            param.method();
          });
        },
        cancel(close: any) {
          close();
        },
      },
    },
    { name: "permission", item: permission }
  );
};

$emptyObject(route.query) ? fetchPermissions() : updateComponent();

const nextPage = async () => {
  useGeneralStore().toggleLoader(true);

  let next = pageInfo.value.nextPageUrl.replace(
    "http://hrm-play-api.herokuapp.com/",
    ""
  );
  await get(next + `&per_page=10`)
    .then((res) => {
      permissions.value = res.data.data[0].permissions;
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

const fetchPage = async (page: any) => {
  useGeneralStore().toggleLoader(true);

  await get("api/permissions" + `?per_page=10&page=${page}`)
    .then((res) => {
      permissions.value = res.data.data[0].permissions;
      pageInfo.value = res.data.data[0].pagination;
      loading.value = false;
      router.push({
        path: route.fullPath,
        query: { per_page: 10, page: page },
      });
      OId.value = 1;
      OId.value = OId.value + pageInfo.value.perPage * (page - 1);
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

const editPermission = (permission: any) => {
  $vfm.show(
    {
      component: EditPermissionsModal,
      bind: {
        name: "VEditPermissionModal",
      },
      on: {
        cancel() {
          fetchPermissions();
        },
      },
    },
    { name: "role", item: permission }
  );
};

const previousPage = async () => {
  useGeneralStore().toggleLoader(true);

  let prev = pageInfo.value.previousPageUrl.replace(
    "http://hrm-play-api.herokuapp.com/",
    ""
  );
  await get(prev + `&per_page=10`)
    .then((res) => {
      permissions.value = res.data.data[0].permissions;
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
</script>

<style scoped></style>
