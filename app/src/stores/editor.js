import { defineStore } from 'pinia';
import { basename } from 'path';

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

    filename: (state) => {
      if (!state.filepath) {
        return null;
      }

      return basename(state.filepath);
    },

    hasUnsavedChanges: (state) => {
      if (state.isTemporary) {
        return state.code.trim() !== defaultCode;
      }

      return false === state.synced;
    },
  },
});
