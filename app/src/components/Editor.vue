<template>
  <MonacoEditor ref="editor" v-model="code" :options="options" class="w-full h-full overflow-hidden"></MonacoEditor>
</template>

<script>
import MonacoEditor, { monaco } from 'monaco-editor-vue';
import { useEditorStore } from '@/stores/editor';
import { mapWritableState } from 'pinia';
import latinoSyntax from '../assets/latino_syntax';

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
        fontSize: 14,
        language: 'latino',
        renderWhitespace: 'all',
        roundedSelection: true,
      },
    };
  },
  async mounted() {
    await this.setupMonacoEditor();
  },
  destroyed() {},
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
        this.$root.$emit('executeCode');
      });
    },

    setupMonacoLanguage() {
      monaco.languages.register({ id: 'latino' });

      monaco.languages.setMonarchTokensProvider('latino', latinoSyntax);
    },
  },
};
</script>

<style scoped></style>
