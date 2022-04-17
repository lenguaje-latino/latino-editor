<template>
  <v-app id="app">
    <v-navigation-drawer permanent app clipped floating width="48">
      <AppSidebar></AppSidebar>
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
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar';
import Editor from '@/components/Editor';
import Terminal from '@/components/Terminal';
import AppSidebar from '@/components/AppSidebar';
import { mapActions } from 'pinia/dist/pinia';
import { useEditorStore } from '@/stores/editor';

export default {
  name: 'App',
  components: {
    AppSidebar,
    Terminal,
    Editor,
    AppBar,
  },
  mounted() {
    window.addEventListener('keyup', this.handleWindowKeyup);

    this.checkQueryParams();
  },
  destroyed() {
    window.removeEventListener('keyup', this.handleWindowKeyup);
  },
  methods: {
    ...mapActions(useEditorStore, ['openFileFromUrl']),

    checkQueryParams() {
      const urlParams = new URLSearchParams(window.location.search);
      const fileUrl = urlParams.get('file');
      if (fileUrl && '' !== fileUrl.trim()) {
        this.openFileFromUrl(fileUrl);
      }
    },

    handleWindowKeyup($event) {
      if ($event.key === 'Escape') {
        this.$root.$emit('focusEditor');
      }
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
