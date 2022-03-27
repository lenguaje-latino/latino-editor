<template>
  <div id="app">
    <div class="w-full h-screen flex flex-col bg-gray-800 text-white overflow-hidden">
      <AppBar></AppBar>

      <vue-split-view class="flex flex-grow flex-row">
        <template #A>
          <Editor></Editor>
        </template>
        <template #B>
          <Terminal></Terminal>
        </template>
      </vue-split-view>
    </div>

    <MenuCommandHandler></MenuCommandHandler>
  </div>
</template>

<script>
import { useEditorStore } from '@/stores/editor';
import { mapActions } from 'pinia';
import AppBar from '@/components/AppBar';
import Editor from '@/components/Editor';
import Terminal from '@/components/Terminal';
import MenuCommandHandler from '@/components/MenuCommandHandler';
import { ipcRenderer } from 'electron';

export default {
  name: 'App',
  components: {
    MenuCommandHandler,
    Terminal,
    Editor,
    AppBar,
  },
  mounted() {
    this.openTemporaryFile();
    ipcRenderer.on('fileSaved', this.onFileSaved);
  },
  destroyed() {
    ipcRenderer.removeListener('fileSaved', this.onFileSaved);
  },
  methods: {
    ...mapActions(useEditorStore, ['openTemporaryFile', 'usingFile']),

    onFileSaved(event, filepath) {
      this.usingFile(filepath);
    },
  },
};
</script>

<style></style>
