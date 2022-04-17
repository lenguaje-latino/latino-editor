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
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar';
import Editor from '@/components/Editor';
import Terminal from '@/components/Terminal';

export default {
  name: 'App',
  components: {
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
    checkQueryParams() {
      const urlParams = new URLSearchParams(window.location.search);
      const file = urlParams.get('file');
      if (file && '' !== file.trim()) {
        setTimeout(() => {
          this.$root.$emit('openFileFromUrl', {
            url: file,
          });
        }, 250);
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
