import { defineStore } from 'pinia';

const defaultCode = 'escribir("Hola mundo, Latino!")';

export const useEditorStore = defineStore('editor', {
  state: () => ({
    code: 'escribir("Hola mundo, Latino!")',

    filepath: null,

    synced: true,

    isTemporary: true,

    wasRecentlyOpened: true,
  }),

  getters: {
    isTemporaryFile: (state) => true === state.isTemporary,

    hasUnsavedChanges: (state) => {
      if (state.isTemporary) {
        return state.code.trim() !== defaultCode;
      }

      return false === state.synced;
    },
  },

  actions: {
    openFile(filepath, temporary = false) {
      this.isTemporary = temporary;
      this.usingFile(filepath);
      // this.code = readFileSync(filepath, 'utf-8');
      this.wasRecentlyOpened = true;
    },

    async openFileFromUrl(url) {
      console.log(['openFileFromUrl', url]);
      const response = await fetch(url);

      this.isTemporary = false;
      this.usingFile(url);
      this.code = await response.text();
      this.wasRecentlyOpened = true;
    },

    usingFile(filepath) {
      this.filepath = filepath;
      this.synced = true;
    },
  },
});
