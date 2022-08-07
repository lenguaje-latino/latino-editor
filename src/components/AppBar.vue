<template>
  <v-row class="w-full h-full" no-gutters>
    <v-col cols="4" class="h-full">
      <v-row no-gutters justify="start" class="h-full space-x-1">
        <v-col no-gutters class="grow-0">
          <AppMenu></AppMenu>
        </v-col>

        <v-col no-gutters class="h-full py-1">
          <v-img src="/assets/logo.png" class="w-10" />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="4" no-gutters class="h-full">
      <v-row no-gutters justify="center" align="center" class="h-full">
        <v-btn
          text
          :prepend-icon="$socket.connected ? 'mdi-play' : 'mdi-lan-connect'"
          height="30"
          class="bg-green-700 text-green-300 bg-opacity-50"
          :disabled="!$socket.connected"
          @click="execute"
        >
          {{ $socket.connected ? 'Ejecutar' : 'Conectando...' }}
        </v-btn>
      </v-row>
    </v-col>

    <v-col cols="4">
      <v-row no-gutters justify="end" align="center" class="h-full px-2">
        <v-tooltip anchor="bottom center">
          <template #activator="{ props }">
            <v-btn
              icon="mdi-share"
              height="36"
              width="36"
              class="rounded-full bg-gray-700 text-gray-300 bg-opacity-50"
              v-bind="props"
              @click="share"
            >
            </v-btn>
          </template>
          <span>Compartir</span>
        </v-tooltip>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import AppMenu from './AppMenu.vue';
import { getSharedUrl } from '../logics/useShare';
import { useEditorStore } from '../stores/editor';
import { useClipboard } from '@vueuse/core/index';
import { inject } from 'vue';

const editorStore = useEditorStore();

const emitter = inject('emitter');

function execute() {
  emitter.emit('executeCode');
}

function share() {
  const url = getSharedUrl(editorStore.code);
  const path = `${url.pathname}${url.search}`;

  window.history.replaceState('', '', path);

  const clipboard = useClipboard({
    source: url.href,
  });
  clipboard.copy();
}
</script>

<style scoped></style>
