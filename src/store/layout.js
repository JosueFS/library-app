import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isMobile: false,
  }),
  getters: {
    mobile: (state) => state.isMobile,
  },
  actions: {
    setIsMobile(isMobile) {
      this.isMobile = isMobile;
    },
  },
  persist: true,
});
