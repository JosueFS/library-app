import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    userPreferences: {
      selectedDeviceId: '',
    },
  }),
  getters: {
    getUserPreferences: (state) => state.userPreferences,
  },
  actions: {
    setUserPreferences(userPreferences) {
      this.userPreferences = { ...this.userPreferences, userPreferences };
    },
  },
  persist: true,
});
