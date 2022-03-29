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
import { mapWritableState } from 'pinia';
import { dirname, join } from 'path';
import appRootDir from 'app-root-dir';

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
      const registry = new Registry({
        getGrammarDefinition: async () => {
          const grammarFilepath =
            process.env.NODE_ENV === 'production'
              ? join(dirname(appRootDir.get()), 'Resources', 'latino.tmLanguage.json')
              : join(appRootDir.get(), 'resources', 'latino.tmLanguage.json');

          const grammarDefinition = readFileSync(grammarFilepath, 'utf-8');

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
  },
};
</script>

<style scoped></style>
