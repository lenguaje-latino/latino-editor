<template>
  <v-menu v-model="innerValue" anchor="end" eager>
    <template #activator="{ props }">
      <v-btn icon="mdi-menu" v-bind="props" />
    </template>
    <MenuContent :menu="menu" @close="closeMenu"></MenuContent>
    <MenuCommandHandler></MenuCommandHandler>
  </v-menu>
</template>

<script>
import MenuContent from './Menu/MenuContent.vue';
import MenuCommandHandler from './Menu/MenuCommandHandler.vue';

const menuTemplate = [
  {
    label: 'Archivo',
    submenu: [
      {
        label: 'Nuevo',
        shortcuts: ['ctrl', 'n'],
        handler: (item, emitter) => {
          emitter.emit('menu-command', {
            command: 'new-file',
          });
        },
      },

      {
        label: 'Abrir',
        shortcuts: ['ctrl', 'o'],
        handler: async (item, emitter) => {
          emitter.emit('menu-command', {
            command: 'ask-open-file',
          });
        },
      },

      { type: 'separator' },

      {
        label: 'Guardar',
        shortcuts: ['ctrl', 's'],
        handler: async (item, emitter) => {
          emitter.emit('menu-command', {
            command: 'ask-save-file',
          });
        },
      },

      {
        label: 'Guardar cómo...',
        shortcuts: ['ctrl', 'shift', 's'],
        handler: async (item, emitter) => {
          emitter.emit('menu-command', {
            command: 'save-file-as',
          });
        },
      },

      { type: 'separator' },

      {
        label: 'Copiar base64',
        handler: async (item, emitter) => {
          emitter.emit('menu-command', {
            command: 'copy-base64-to-clipboard',
          });
        },
      },
    ],
  },

  {
    label: 'Editar',
    submenu: [
      {
        label: 'Deshacer',
        shortcuts: ['ctrl', 'z'],
        handler: (item, emitter) => {
          emitter.emit('editor.undo');
        },
      },
      {
        label: 'Rehacer',
        shortcuts: ['ctrl', 'shift', 'z'],
        handler: (item, emitter) => {
          emitter.emit('editor.redo');
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Cortar',
        shortcuts: ['ctrl', 'x'],
        handler: (item, emitter) => {
          emitter.emit('editor.cut');
        },
      },
      {
        label: 'Copiar',
        shortcuts: ['ctrl', 'c'],
        handler: (item, emitter) => {
          emitter.emit('editor.copy');
        },
      },
      {
        label: 'Pegar',
        shortcuts: ['ctrl', 'v'],
        handler: (item, emitter) => {
          emitter.emit('editor.paste');
        },
      },
      { type: 'separator' },
      {
        label: 'Seleccionar todo',
        shortcuts: ['ctrl', 'A'],
        handler: (item, emitter) => {
          emitter.emit('editor.selectAll');
        },
      },
    ],
  },

  // {
  //   label: 'Ver',
  //   submenu: [
  //     { label: 'Restablecer vista', role: 'resetzoom' },
  //     { label: 'Acercamiento', role: 'zoomin' },
  //     { label: 'Alejamiento', role: 'zoomout' },
  //     { type: 'separator' },
  //     { label: 'Pantalla completa', role: 'togglefullscreen' },
  //   ],
  // },

  // {
  //   label: 'Ayuda',
  //   submenu: [
  //     {
  //       label: 'Documentacion',
  //       shortcuts: ['F1'],
  //       accelerator: 'F1',
  //     },
  //
  //     {
  //       label: 'Repo (Github)',
  //       handler: async () => {
  //         // const { shell } = require('electron');
  //         // await shell.openExternal('https://github.com/lenguaje-latino/latino-editor');
  //       },
  //     },
  //
  //     { type: 'separator' },
  //
  //     {
  //       label: 'Acerca del programa',
  //       role: 'help',
  //       handler: async () => {
  //         // const { shell } = require('electron');
  //         // await shell.openExternal('https://latinoeditor.enzonotario.me');
  //       },
  //     },
  //   ],
  // },
];

export default {
  name: 'AppMenu',
  components: { MenuCommandHandler, MenuContent },
  data() {
    return {
      innerValue: false,
      menu: menuTemplate,
    };
  },
  methods: {
    closeMenu() {
      this.innerValue = false;
    },
  },
};
</script>

<style scoped></style>
