<template>
  <v-app id="app" style="height: 100vh" class="bg-app-900 overflow-hidden">
    <v-app-bar app flat height="46" class="AppBar">
      <AppBar />
    </v-app-bar>

    <v-navigation-drawer v-model="sidebar" app permanent clipped width="48">
      <AppSidebar class="bg-app-900" />
    </v-navigation-drawer>

    <v-main class="flex-1 overflow-hidden">
      <v-row no-gutters class="w-full h-full">
        <vue-split-view :direction="view">
          <template #A>
            <Editor />
          </template>
          <template #B>
            <Terminal />
          </template>
        </vue-split-view>
      </v-row>
    </v-main>

    <v-footer app height="32" class="grow-0 p-0 bg-app-900" style="z-index: 3000">
      <AppFooter />
    </v-footer>
  </v-app>
</template>

<script>
import VueSplitView from 'vue-split-view';
import 'vue-split-view/dist/style.css';
import AppBar from './components/AppBar.vue';
import AppSidebar from './components/AppSidebar.vue';
import Editor from './components/Editor.vue';
import Terminal from './components/Terminal.vue';
import AppFooter from './components/AppFooter.vue';
import { mapState, mapActions } from 'pinia';
import { useSettingsStore } from './stores/settings';
import { useAppStore } from './stores/app';
import { useEditorStore } from './stores/editor';

export default {
  name: 'App',
  components: {
    AppFooter,
    Terminal,
    VueSplitView,
    Editor,
    AppSidebar,
    AppBar,
  },
  computed: {
    ...mapState(useSettingsStore, ['view']),
    ...mapState(useAppStore, ['sidebar']),
  },
  mounted() {
    window.addEventListener('keyup', this.handleWindowKeyup);
    this.setupTheme();
    this.checkQueryParams();
    this.$gtag.pageview('/');
  },
  unmounted() {
    window.removeEventListener('keyup', this.handleWindowKeyup);
  },
  methods: {
    ...mapActions(useEditorStore, ['openFile', 'openFileFromUrl']),

    setupTheme() {
      if ('theme' in localStorage && localStorage.theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    },

    checkQueryParams() {
      const urlParams = new URLSearchParams(window.location.search);

      const fileUrl = urlParams.get('file');
      if (fileUrl && '' !== fileUrl.trim()) {
        this.openFileFromUrl(fileUrl);
      }

      const base64 = urlParams.get('base64');
      if (base64 && '' !== base64.trim()) {
        const decoded = atob(base64);
        this.openFile('codigo.lat', decoded, true, true);
      }
    },

    handleWindowKeyup($event) {
      if ($event.key === 'Escape') {
        this.emitter.emit('editor.focus');
      }
    },
  },
};
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}

.AppBar {
  padding-left: 0 !important;
  padding-right: 0 !important;
  .v-toolbar__content {
    @apply bg-app-800;
    padding: 0 !important;
  }
}
</style>
