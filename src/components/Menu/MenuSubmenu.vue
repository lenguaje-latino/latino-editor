<template>
  <v-menu v-model="innerValue" anchor="end" close-delay="300" eager>
    <template #activator="{ props: menuProps }">
      <v-hover v-slot="{ props }" @update:modelValue="onActivatorHover">
        <v-list-item
          v-bind="{ ...menuProps, ...props }"
          :title="item.label"
          append-icon="mdi-chevron-right"
          @click="openMenu"
        >
        </v-list-item>
      </v-hover>
    </template>
    <v-hover v-slot="{ props }" close-delay="300" @update:modelValue="onContentHover">
      <v-list v-bind="props">
        <template v-for="(subitem, subitemIdx) of item.submenu">
          <v-divider
            v-if="'separator' === subitem.type"
            :key="`item-menu-${itemIdx}-separator-${subitemIdx}`"
          ></v-divider>

          <MenuItem
            v-else
            :key="`item-menu-${itemIdx}-subitem-${subitemIdx}`"
            :item="subitem"
            @closeAll="closeAll"
          ></MenuItem>
        </template>
      </v-list>
    </v-hover>
  </v-menu>
</template>

<script setup>
import debounce from 'lodash.debounce';
import MenuItem from './MenuItem.vue';
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
  value: Boolean,
  item: Object,
  itemIdx: Number,
});

const emit = defineEmits(['opened', 'closed', 'closeAll']);

const innerValue = ref(false);
const activatorHover = ref(false);
const contentHover = ref(false);

function onActivatorHover(value) {
  activatorHover.value = value;
  if (value) {
    openMenu();
  } else {
    onActivatorMouseleaveDebounced();
  }
}

const onActivatorMouseleaveDebounced = debounce(function () {
  if (!activatorHover.value && !contentHover.value) {
    closeMenu();
  }
}, 200);

function onContentHover(value) {
  contentHover.value = value;
  if (value || activatorHover.value) {
    openMenu();
  } else {
    closeMenu();
  }
}

function openMenu() {
  innerValue.value = true;
  emit('opened');
}

function closeMenu() {
  innerValue.value = false;
  emit('closed');
}

function closeAll() {
  closeMenu();
  emit('closeAll');
}
</script>

<style scoped></style>
