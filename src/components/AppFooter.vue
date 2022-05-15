<template>
  <v-row align="center" no-gutters class="h-full px-2 space-x-1">
    <v-col no-gutters class="grow-0">
      <v-tooltip anchor="top end">
        <template #activator="{ props }">
          <v-btn
            size="x-small"
            :color="runningPids.value && runningPids.value.length ? 'teal' : 'gray'"
            icon="mdi-console-network-outline"
            variant="text"
            v-bind="props"
          />
        </template>
        <span>{{ runningPids.value && runningPids.value.length ? 'Ejecutando...' : 'A la espera' }}</span>
      </v-tooltip>
    </v-col>

    <v-spacer />

    <v-col no-gutters class="grow-0">
      <v-tooltip anchor="top end">
        <template #activator="{ props }">
          <v-btn
            size="x-small"
            :icon="'horizontal' === view ? 'mdi-view-split-vertical' : 'mdi-view-split-horizontal'"
            v-bind="props"
            @click="view = 'horizontal' === view ? 'vertical' : 'horizontal'"
          />
        </template>
        <span>Cambiar dirección</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import { useSettingsStore } from '../stores/settings';
import { useEditorStore } from '../stores/editor';

export default {
  name: 'AppFooter',
  computed: {
    ...mapState(useEditorStore, ['runningPids']),
    ...mapWritableState(useSettingsStore, ['view']),
  },
};
</script>

<style scoped></style>
