<template>
  <v-layout class="space-x-2 h-full">
    <v-tabs>
      <v-tab :key="synced + '-' + isTemporaryFile">
        <v-icon v-if="!synced" size="14" class="mr-1">mdi-pencil</v-icon>
        <span class="truncate normal-case">{{ isTemporaryFile ? 'Código temporal' : filename }}</span>
      </v-tab>
    </v-tabs>
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
