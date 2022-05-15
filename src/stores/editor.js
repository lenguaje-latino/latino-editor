import { defineStore } from 'pinia';

const defaultCode = 'escribir("Hola mundo, Latino!")';

export const useEditorStore = defineStore('editor', {
  state: () => ({
    code: 'escribir("Hola mundo, Latino!")',

    filepath: 'codigo.lat',

    synced: true,

    isTemporary: true,

    isNewFile: false,

    wasRecentlyOpened: true,

    runningPids: [],
  }),

  getters: {
    isTemporaryFile: (state) => true === state.isTemporary,

    hasUnsavedChanges: (state) => {
      if (state.isNewFile) {
        return state.code.trim() !== '';
      }

      if (state.isTemporary) {
        return state.code.trim() !== defaultCode;
      }

      return false === state.synced;
    },
  },

  actions: {
    openNewFile() {
      this.openFile('codigo.lat', '', true, true);
    },

    openFile(filepath, content, isTemporary = false, isNewFile = false) {
      this.isTemporary = isTemporary;
      this.isNewFile = isNewFile;
      this.usingFile(filepath);
      this.code = content;
      this.wasRecentlyOpened = true;
    },

    async openFileFromUrl(url) {
      const response = await fetch(url);

      this.isNewFile = false;
      this.isTemporary = false;
      this.usingFile(url);
      this.code = await response.text();
      this.wasRecentlyOpened = true;
    },

    usingFile(filepath) {
      this.filepath = filepath;
      this.synced = true;
      this.isTemporary = false;
    },
  },
});
