<template>
  <v-list>
    <template v-for="(item, itemIdx) of innerValue">
      <v-list-item v-if="!item.submenu || (item.submenu && !item.submenu.length)" :key="`item-${itemIdx}`">
        <v-list-item-title> {{ item.label }} </v-list-item-title>
      </v-list-item>

      <MenuSubmenu
        v-if="item.submenu && item.submenu.length"
        :key="`item-menu-${itemIdx}`"
        :value="item.value"
        :item="item"
        :item-idx="itemIdx"
        @opened="closeItemsExcept(item.id)"
        @closed="closeItem(item.id)"
        @closeAll="closeAll"
      ></MenuSubmenu>
    </template>
  </v-list>
</template>

<script setup>
import MenuSubmenu from './MenuSubmenu.vue';
import { v4 as uuidv4 } from 'uuid';
import { defineProps, ref } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
  menu: Object,
});

const innerValue = ref(
  props.menu.map((item) => ({
    ...item,
    id: uuidv4(),
    value: false,
    submenu: item.submenu.map((subitem) => ({
      ...subitem,
      handler: subitem.handler
        ? subitem.handler
        : (item, emitter) => {
            emitter.emit('menu-command', {
              command: 'fallback',
              item,
            });
          },
    })),
  })),
);

const emit = defineEmits(['close']);

function closeItemsExcept(exceptItemId) {
  innerValue.value = innerValue.value.map((item) => ({
    ...item,
    value: item.id === exceptItemId,
  }));
}

function closeItem(itemId) {
  innerValue.value = innerValue.value.map((item) => ({
    ...item,
    value: item.id === itemId ? false : item.value,
  }));
}

function closeAll() {
  emit('close');
}
</script>

<style scoped></style>
