<template>
  <div class="loader" v-if="loading">
    <div class="loader__box">
      <div v-for="(i, index) in altara" :key="index" class="loader__dot">
        {{ i }}
      </div>
      <div class="loader__text"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGeneralStore } from "@/stores/generalStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const altara = ref(["A", "L", "T", "A", "R", "A"]);
const { loading } = storeToRefs(useGeneralStore());
</script>

<style scoped>
.loader {
  height: 100vh;
  width: 100vw;
  background-color: rgba($color-black, 0.4);
  position: fixed;
  z-index: 1100;
}
.loader__box {
  height: 1.8rem;
  width: 2.2rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateX(-10rem);
}
.loader__dot {
  text-align: center;
  animation: loader ease-in-out 3s infinite;
  height: 2.2rem;
  width: 2.2rem;
  border-radius: 100%;
  position: absolute;
  border: 1px solid $default-color;
  font-weight: bold;
  color: $default-color;
  background-color: $color-white;
}
.loader__dot:nth-child(1) {
  animation-delay: 0.5s;
}
.loader__dot:nth-child(2) {
  animation-delay: 0.4s;
}
.loader__dot:nth-child(3) {
  animation-delay: 0.3s;
}
.loader__dot:nth-child(4) {
  animation-delay: 0.2s;
}
.loader__dot:nth-child(5) {
  animation-delay: 0.1s;
}
.loader__dot:nth-child(6) {
  animation-delay: 0s;
}

.loader__text {
  position: absolute;
  top: 200%;
  left: 0;
  right: 0;
  width: 2rem;
  margin: auto;
  transform: translateX(6rem);
}
.loader__text:after {
  content: "Loading...";
  font-size: $default-font-size-icon;
  letter-spacing: 0.5rem;
  color: $color-white;
  animation: loading-text ease-in-out 3s infinite;
}
</style>
