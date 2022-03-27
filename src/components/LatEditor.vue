<template>
  <MonacoEditor ref="editor" v-model="code" :options="options" class="w-full h-full overflow-hidden"></MonacoEditor>
</template>

<script>
import MonacoEditor, { monaco } from 'monaco-editor-vue';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';
import { readFileSync } from 'fs';
import { useEditorStore } from '@/stores/editor';
import { ipcRenderer } from 'electron';
import { mapActions, mapWritableState } from 'pinia';

export default {
  name: 'LatEditor',
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
      },
    };
  },
  async mounted() {
    await this.setupMonacoEditor();

    this.$root.$on('saveAndExecute', this.saveAndExecute);
    ipcRenderer.on('fileSaved', this.onFileSaved);
  },
  destroyed() {
    this.$root.$off('saveAndExecute', this.saveAndExecute);
    ipcRenderer.removeListener('fileSaved', this.onFileSaved);
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
    onFileSaved(event, filepath) {
      this.usingFile(filepath);
    },

    async setupMonacoEditor() {
      const registry = new Registry({
        getGrammarDefinition: async () => {
          const grammarDefinition = readFileSync('./public/latino.tmLanguage.json', 'utf-8');
          return {
            format: 'json',
            content: grammarDefinition,
          };
        },
      });

      const grammars = new Map();
      grammars.set('latino', 'source.latino');

      monaco.languages.register({ id: 'latino' });

      await wireTmGrammars(monaco, registry, grammars, this.$refs.editor.editor);

      this.$refs.editor.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        this.saveAndExecute();
      });
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

    ...mapActions(useEditorStore, ['usingFile']),
  },
};
</script>

<style scoped></style>
