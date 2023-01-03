import { defineStore } from "pinia";

export const useGeneralStore = defineStore("loader", {
  state: () => ({
    loading: false
  }),
  actions: {
    toggleLoader(s: boolean){
      this.loading = s;
    }
  }
});
