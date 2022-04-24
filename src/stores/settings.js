import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    view: 'horizontal',

    editorFontSize: 16,

    terminalFontSize: 16,
  }),

  getters: {},

  actions: {},
});
