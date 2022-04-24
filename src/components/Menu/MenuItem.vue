<template>
  <v-list-item v-shortkey="item.shortcuts" @shortkey="triggerHandler(item)" @click="triggerHandler(item)">
    <v-list-item-header>
      <v-list-item-title> {{ item.label }} </v-list-item-title>
    </v-list-item-header>
    <v-list-item-action v-if="shortcuts" class="pl-3 text-gray-800 dark:text-gray-400">
      {{ shortcuts }}
    </v-list-item-action>
  </v-list-item>
</template>

<script setup>
import { defineProps, inject, defineEmits } from 'vue';

const emitter = inject('emitter');

const props = defineProps({
  item: Object,
});

const emit = defineEmits(['closeAll']);

const shortcuts =
  props.item.shortcuts && props.item.shortcuts.length
    ? props.item.shortcuts.map((shortcut) => toTitleCase(shortcut)).join('+')
    : null;

function toTitleCase(text) {
  return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
}

function triggerHandler(item) {
  emit('closeAll');
  item.handler(item, emitter);
}
</script>
