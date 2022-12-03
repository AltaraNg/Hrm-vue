<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const staffId = ref("");
const password = ref("");

async function onSubmit(credentials: any) {
  const authStore = useAuthStore();
  let { staffId, password } = credentials;

  return await authStore.signin(staffId, password);
}
</script>

<template>
  <div class="bg-login-bg h-screen flex flex-col auto-rows-min font-outfit">
    <div class="py-2 px-3 bg-altara-bg">
      <img src="../assets/altara_log.png" alt="logo" width="100" height="85" />
    </div>
    <div
      class="lg:w-1/3 lg:m-auto lg:p-10 sm:w-2/3 sm:p-2 bg-white shadow-lg rounded-md sm:mx-5"
    >
      <FormKit
        autocomplete="on"
        type="form"
        id="login-form"
        submit-label="Login"
        @submit="onSubmit"
        :actions="false"
        :classes="{
          message: 'text-red-500 text-xs',
        }"
      >
        <div class="text-center font-bold text-gray-900 my-2">
          Log in to your account
        </div>
        <div class="my-3">
          <FormKit
            name="staffId"
            type="text"
            label="Staff ID"
            v-model="staffId"
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
        </div>
        <div class="my-3">
          <FormKit
            name="password"
            type="password"
            label="Password"
            v-model="password"
            validation="required"
            :classes="{
              outer: 'w-full',
              label: 'block mb-1 font-outfit text-sm',
              inner:
                'border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
              input:
                'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
              help: 'text-xs text-gray-500',
              message: 'text-red-500 text-xs',
            }"
          ></FormKit>
        </div>

        <div class="my-3 font-bold text-xs">
          <a
            :href="`https://play.altaracredit.com/password/forgot`"
            class="font-bold"
            >Forgot password?</a
          >
        </div>
        <FormKit type="submit" label="Login" />
      </FormKit>
    </div>
  </div>
</template>
