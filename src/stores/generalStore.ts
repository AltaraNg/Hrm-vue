import { defineStore } from "pinia";

export const useGeneralStore = defineStore("loader", {
  state: () => ({
    loading: false
  }),
  actions: {
    toggleLoader(){
      this.loading = !this.loading;
    }
  }
});
