<template>
  <MonacoEditor ref="editor" v-model="code" :options="options" class="w-full h-full overflow-hidden"></MonacoEditor>
</template>

<script>
import MonacoEditor, { monaco } from 'monaco-editor-vue';
import { useEditorStore } from '@/stores/editor';
import { ipcRenderer } from 'electron';
import { mapWritableState } from 'pinia';
import latinoSyntax from './latino_syntax';

export default {
  name: 'Editor',
  components: {
    MonacoEditor,
  },
  data() {
    return {
      options: {
        automaticLayout: true,
        vertical: 'visible',
        horizontal: 'visible',
        theme: 'vs-dark',
        fontFamily: 'Fira Code',
        fontSize: 18,
        language: 'latino',
        renderWhitespace: 'all',
        roundedSelection: true,
      },
    };
  },
  async mounted() {
    await this.setupMonacoEditor();

    this.$root.$on('saveAndExecute', this.saveAndExecute);
  },
  destroyed() {
    this.$root.$off('saveAndExecute', this.saveAndExecute);
  },
  computed: {
    ...mapWritableState(useEditorStore, ['filepath', 'code', 'synced', 'wasRecentlyOpened']),
  },
  watch: {
    filepath(value, oldValue) {
      this.wasRecentlyOpened = value !== oldValue;
    },

    code(value, oldValue) {
      if (this.wasRecentlyOpened) {
        this.wasRecentlyOpened = false;
        return;
      }

      if (value !== oldValue) {
        this.synced = false;
      }
    },
  },
  methods: {
    async setupMonacoEditor() {
      this.setupMonacoLanguage();

      this.$refs.editor.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        this.saveAndExecute();
      });
    },

    setupMonacoLanguage() {
      monaco.languages.register({ id: 'latino' });

      monaco.languages.setMonarchTokensProvider('latino', latinoSyntax);
    },

    saveAndExecute() {
      this.saveFile();
      this.execute();
    },

    saveFile() {
      ipcRenderer.send('saveFile', {
        filepath: this.filepath,
        content: this.code,
      });
    },

    execute() {
      ipcRenderer.send('executeCode', {
        filepath: this.filepath,
      });
    },
  },
};
</script>

<style scoped></style>
