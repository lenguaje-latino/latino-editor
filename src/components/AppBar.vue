<template>
  <v-layout class="relative space-x-2 h-full">
    <v-tabs>
      <v-tab :key="synced + '-' + isTemporaryFile">
        <v-icon v-if="!synced" size="14" class="mr-1">mdi-pencil</v-icon>
        <span class="truncate normal-case">{{ isTemporaryFile ? 'Código temporal' : filename }}</span>
      </v-tab>
    </v-tabs>

    <v-layout align-center class="absolute right-0 h-full space-x-1 z-10">
      <v-flex shrink class="mr-2">
        <v-layout align-center class="bg-gray-700 py-1 px-2 space-x-1 rounded-full">
          <v-icon :color="$socket.connected ? 'teal' : 'red'">mdi-circle</v-icon>
          <span>{{ $socket.connected ? 'Conectado' : 'Desconectado' }}</span>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapState } from 'pinia';
import { useEditorStore } from '@/stores/editor';

export default {
  name: 'AppBar',
  computed: {
    ...mapState(useEditorStore, ['isTemporaryFile', 'filename', 'synced']),
  },
};
</script>

<style scoped></style>
