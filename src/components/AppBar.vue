<template>
  <div class="flex flex-row items-center space-x-2">
    <div class="flex flex-shrink max-w-1/3 h-full">
      <div
        class="flex flex-row items-center w-full h-full px-2 space-x-1 bg-gray-900 text-gray-100 border-b-2 border-primary-500"
      >
        <PencilIcon v-if="!synced" size="16"></PencilIcon>
        <span class="truncate">{{ isTemporaryFile ? 'Código temporal' : filename }}</span>
      </div>
    </div>

    <div class="flex flex-row items-center p-2 space-x-2">
      <button class="p-1 bg-primary-700 hover:bg-primary-600 text-primary-50 rounded">
        <button @click="execute" class="flex flex-row items-center space-x-1">
          <PlayIcon></PlayIcon>
          <span>Ejecutar</span>
        </button>
      </button>
    </div>
  </div>
</template>

<script>
import { PencilIcon, PlayIcon } from '@vue-hero-icons/outline';
import { mapState } from 'pinia';
import { useEditorStore } from '@/stores/editor';

export default {
  name: 'AppBar',
  components: { PlayIcon, PencilIcon },
  methods: {
    execute() {
      this.$root.$emit('saveAndExecute');
    },
  },
  computed: {
    ...mapState(useEditorStore, ['isTemporaryFile', 'filename', 'synced']),
  },
};
</script>

<style scoped></style>
