<template>
  <div v-if="useGeneralStore().loading" id="overlay">
    <div class="blob-1"></div>
    <div class="blob-2"></div>
  </div>
</template>
<script setup lang="ts">
import { useGeneralStore } from "@/stores/generalStore";
</script>

<style>
#overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  cursor: pointer;
}

#text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.blob-1,
.blob-2 {
  width: 60px;
  height: 60px;
  position: absolute;
  background: #094a73;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.blob-1 {
  left: 20%;
  animation: osc-l 2.5s ease infinite;
}
.blob-2 {
  left: 80%;
  animation: osc-r 2.5s ease infinite;
  background: #fff;
}
@keyframes osc-l {
  0% {
    left: 20%;
  }
  50% {
    left: 50%;
  }
  100% {
    left: 20%;
  }
}
@keyframes osc-r {
  0% {
    left: 80%;
  }
  50% {
    left: 50%;
  }
  100% {
    left: 80%;
  }
}
</style>
