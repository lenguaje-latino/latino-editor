<template>
  <v-row align="center" no-gutters class="h-full px-2 space-x-1">
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
import { mapWritableState } from 'pinia';
import { useSettingsStore } from '../stores/settings';

export default {
  name: 'AppFooter',
  computed: {
    ...mapWritableState(useSettingsStore, ['view']),
  },
};
</script>

<style scoped></style>
