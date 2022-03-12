<template>
  <div class="flex flex-row items-center space-x-2">
    <div class="flex flex-shrink flex-row items-center h-full px-2 bg-neutral-900 text-neutral-100">
      <span> LatinoEditor </span>
    </div>

    <div class="flex flex-row items-center p-2 space-x-2">
      <button class="p-1 bg-primary-700 text-primary-50 rounded">
        <div class="flex flex-row items-center space-x-1">
          <PlayIcon></PlayIcon>
          <span>Ejecutar</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { PlayIcon } from '@vue-hero-icons/outline';

export default {
  name: 'AppBar',
  components: { PlayIcon },
};
</script>

<style scoped></style>
