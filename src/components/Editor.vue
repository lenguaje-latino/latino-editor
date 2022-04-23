<template>
  <div id="editor" ref="editor" class="w-full h-full overflow-hidden" />
</template>

<script>
import * as monaco from 'monaco-editor';
import { mapState, mapWritableState } from 'pinia';
import { useEditorStore } from '../stores/editor';
import latinoSyntax from '../assets/latino_syntax';
import { useSettingsStore } from '../stores/settings';

let editor;

export default {
  name: 'Editor',
  data() {
    return {
      options: {
        automaticLayout: true,
        vertical: 'visible',
        horizontal: 'visible',
        theme: 'vs-dark',
        fontFamily: 'Fira Code',
        fontSize: useSettingsStore().$state.editorFontSize,
        language: 'latino',
        renderWhitespace: 'all',
        roundedSelection: true,
      },
    };
  },
  computed: {
    ...mapState(useEditorStore, ['filepath']),
    ...mapWritableState(useEditorStore, ['code', 'synced', 'wasRecentlyOpened']),
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

      this.syncEditorValue();
    },
  },
  async mounted() {
    await this.setupMonacoEditor();
    this.emitter.on('focusEditor', this.focusEditor);
  },
  unmounted() {
    this.emitter.off('focusEditor', this.focusEditor);
  },
  methods: {
    async setupMonacoEditor() {
      editor = monaco.editor.create(document.getElementById('editor'), this.options);

      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        this.emitter.emit('executeCode');
      });

      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        if (this.code !== value) {
          this.code = value;
        }
      });

      this.syncEditorValue();

      this.setupMonacoLanguage();
    },

    setupMonacoLanguage() {
      monaco.languages.register({ id: 'latino' });

      monaco.languages.setMonarchTokensProvider('latino', latinoSyntax);
    },

    syncEditorValue() {
      if (!editor || this.code === editor.getValue()) {
        return;
      }

      editor.setValue(this.code);
    },

    focusEditor() {
      editor.focus();
    },
  },
};
</script>

<style scoped></style>
