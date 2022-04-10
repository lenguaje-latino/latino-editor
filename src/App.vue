<template>
  <v-app id="app">
    <v-navigation-drawer permanent app clipped floating width="48">
      <v-layout column align-center class="min-h-full py-2 space-y-2">
        <v-btn color="primary" fab small depressed @click="execute">
          <v-icon size="32">mdi-play</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn fab small depressed>
          <v-icon size="24">mdi-cog-outline</v-icon>
        </v-btn>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar app dense flat clipped-left class="AppBar">
      <AppBar></AppBar>
    </v-app-bar>

    <v-main>
      <v-layout column class="w-full h-full flex flex-col overflow-hidden">
        <vue-split-view class="flex flex-grow flex-row">
          <template #A>
            <Editor></Editor>
          </template>
          <template #B>
            <Terminal></Terminal>
          </template>
        </vue-split-view>
      </v-layout>
    </v-main>

    <MenuCommandHandler></MenuCommandHandler>
  </v-app>
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

    execute() {
      this.$root.$emit('saveAndExecute');
    },
  },
};
</script>

<style lang="scss">
html {
  overflow: hidden;
}

.AppBar {
  .v-toolbar__content {
    padding: 0;
  }
}
</style>
