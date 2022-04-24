<template>
  <div id="editor" ref="editor" class="w-full h-full overflow-hidden" />
</template>

<script>
import * as monaco from 'monaco-editor';
import { mapWritableState } from 'pinia';
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
    ...mapWritableState(useEditorStore, ['code', 'synced', 'wasRecentlyOpened']),
  },
  watch: {
    code(value, oldValue) {
      if (!this.wasRecentlyOpened && value !== oldValue) {
        this.synced = false;
      }

      if (this.wasRecentlyOpened) {
        this.wasRecentlyOpened = false;
      }

      this.syncValueFromStore();
    },
  },
  async mounted() {
    await this.setupMonacoEditor();
    this.emitter.on('editor.focus', this.focusEditor);
    this.emitter.on('editor.undo', this.triggerEditorUndo);
    this.emitter.on('editor.redo', this.triggerEditorRedo);
    this.emitter.on('editor.cut', this.triggerEditorCut);
    this.emitter.on('editor.copy', this.triggerEditorCopy);
    this.emitter.on('editor.paste', this.triggerEditorPaste);
    this.emitter.on('editor.selectAll', this.triggerEditorSelectAll);
  },
  unmounted() {
    this.emitter.off('editor.focus', this.focusEditor);
    this.emitter.off('editor.undo', this.triggerEditorUndo);
    this.emitter.off('editor.redo', this.triggerEditorRedo);
    this.emitter.off('editor.cut', this.triggerEditorCut);
    this.emitter.off('editor.copy', this.triggerEditorCopy);
    this.emitter.off('editor.paste', this.triggerEditorPaste);
    this.emitter.off('editor.selectAll', this.triggerEditorSelectAll);
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

      this.syncValueFromStore();

      this.setupMonacoLanguage();
    },

    setupMonacoLanguage() {
      monaco.languages.register({ id: 'latino' });

      monaco.languages.setMonarchTokensProvider('latino', latinoSyntax);
    },

    syncValueFromStore() {
      if (!editor || this.code === editor.getValue()) {
        return;
      }

      editor.setValue(this.code);
    },

    focusEditor() {
      editor.focus();
    },

    triggerEditorUndo() {
      editor.trigger('source', 'undo');
    },

    triggerEditorRedo() {
      editor.trigger('source', 'redo');
    },

    triggerEditorCut() {
      editor.trigger('source', 'editor.action.clipboardCutAction');
    },

    triggerEditorCopy() {
      editor.trigger('source', 'editor.action.clipboardCopyAction');
    },

    triggerEditorPaste() {
      this.focusEditor();
      editor.trigger('source', 'editor.action.clipboardPasteAction');
    },

    triggerEditorSelectAll() {
      const range = editor.getModel().getFullModelRange();
      editor.setSelection(range);
    },
  },
};
</script>

<style scoped></style>
