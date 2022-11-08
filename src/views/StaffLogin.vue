<script setup lang="ts">
import { reactive } from "vue";

interface LoginDetails {
  staffId: string;
  password: string;
}

const loginDetails: LoginDetails = reactive({ staffId: "", password: "" });
</script>

<template>
  <form>
    <div class="">Login Page</div>
  </form>
</template>
