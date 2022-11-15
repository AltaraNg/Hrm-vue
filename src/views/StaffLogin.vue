<script setup lang="ts">
import { Form as VeeForm, Field } from "vee-validate";
import { object, string } from "yup";
import { useAuthStore } from "@/stores/auth";
import LoadingButton from "@/components/LoadingButton.vue";

const schema = object().shape({
  staffId: string().required("Staff ID is required"),
  password: string().required("Password is required"),
});

async function onSubmit(values: any, { setErrors }) {
  const authStore = useAuthStore();
  const { staffId, password } = values;

  try {
    await authStore.signin(staffId, password);
  } catch (error) {
    setErrors({ apiError: error });
  }
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
      <VeeForm
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting, handleSubmit }"
      >
        <form @submit="handleSubmit($event, onSubmit)">
          <div class="text-center font-bold text-gray-900 my-2">
            Log in to your account
          </div>
          <div class="my-3">
            <label for="staffId" class="block text-xs my-1">Staff ID</label>
            <Field
              type="text"
              name="staffId"
              id="staff_id"
              class="w-full border rounded py-2 px-2"
            />
            <pre class="text-xs text-red-500 font-outfit">{{
              errors.staffId
            }}</pre>
          </div>
          <div class="my-3">
            <label for="password" class="block text-xs my-1">Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              class="w-full border rounded py-2 px-2"
            />
            <pre class="text-xs text-red-500 font-outfit">{{
              errors.password
            }}</pre>
          </div>

          <div class="my-3 font-bold text-xs">
            <a
              :href="`https://play.altaracredit.com/password/forgot`"
              class="font-bold"
              >Forgot password?</a
            >
          </div>
          <LoadingButton
            :loading="isSubmitting"
            :class="'bg-altara-blue text-white'"
            >Login</LoadingButton
          >
        </form>
      </VeeForm>
    </div>
  </div>
</template>
