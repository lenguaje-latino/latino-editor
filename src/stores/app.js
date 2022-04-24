import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: false,
  }),

  getters: {},

  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
  },
});
