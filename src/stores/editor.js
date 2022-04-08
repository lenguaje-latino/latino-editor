import { defineStore } from 'pinia';
import { readFileSync } from 'fs';
import { ipcRenderer } from 'electron';
import { basename } from 'path';

const defaultCode = 'escribir("Hola mundo!")';

export const useEditorStore = defineStore('editor', {
  state: () => ({
    code: null,

    filepath: null,

    synced: true,

    isTemporary: false,

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

  actions: {
    openTemporaryFile() {
      ipcRenderer.send('openTemporaryFile', {
        filename: 'codigo.lat',
        content: defaultCode,
      });
    },

    openFile(filepath, temporary = false) {
      this.isTemporary = temporary;
      this.usingFile(filepath);
      this.code = readFileSync(filepath, 'utf-8');
      this.wasRecentlyOpened = true;
    },

    usingFile(filepath) {
      this.filepath = filepath;
      this.synced = true;
    },
  },
});
