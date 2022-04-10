import { Menu } from 'electron';

const isDevelopment = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

function createMenu() {
  const menuTemplate = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Nuevo',
          accelerator: 'CommandOrControl+N',
          role: 'new',
          click: (item, win) => {
            win.webContents.send('menu-command', {
              command: 'new-file',
            });
          },
        },

        {
          label: 'Abrir',
          accelerator: 'CommandOrControl+O',
          role: 'open',
          click: async (item, win) => {
            win.webContents.send('menu-command', {
              command: 'ask-open-file',
            });
          },
        },

        { type: 'separator' },

        {
          label: 'Guardar',
          accelerator: 'CommandOrControl+S',
          role: 'save',
          click: async (item, win) => {
            win.webContents.send('menu-command', {
              command: 'ask-save-file',
            });
          },
        },

        {
          label: 'Guardar cómo...',
          accelerator: 'CommandOrControl+Shift+S',
          role: 'saveAs',
          click: async (item, win) => {
            win.webContents.send('menu-command', {
              command: 'save-file-as',
            });
          },
        },

        { type: 'separator' },

        isMac
          ? {
              label: 'Salir',
              role: 'close',
            }
          : {
              label: 'Salir',
              role: 'quit',
            },
      ],
    },

    {
      label: 'Editar',
      submenu: [
        {
          label: 'Deshacer',
          role: 'undo',
        },
        {
          label: 'Rehacer',
          role: 'redo',
        },
        {
          type: 'separator',
        },
        {
          label: 'Cortar',
          role: 'cut',
        },
        {
          label: 'Copiar',
          role: 'copy',
        },
        {
          label: 'Pegar',
          role: 'paste',
        },
        { type: 'separator' },
        {
          label: 'Seleccionar todo',
          role: 'selectall'
        },
      ],
    },

    {
      label: 'Ver',
      submenu: [
        { label: 'restablecer vista', role: 'resetzoom' },
        { label: 'acercamiento', role: 'zoomin' },
        { label: 'alejamiento', role: 'zoomout' },
        { type: 'separator' },
        { label: 'Pantalla completa', role: 'togglefullscreen' }
      ]
  },

    {
      label: 'Ventana',
      role: 'window',
      submenu: [
        ...(isDevelopment
          ? [
              {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: function (item, focusedWindow) {
                  if (focusedWindow) {
                    focusedWindow.reload();
                  }
                },
              },
            ]
          : []),
        {
          label: 'Minimizar',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          label: 'Cerrar',
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
      ],
    },

    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Documentacion',
          accelerator: 'F1',
        },

        {
          label: 'Repo (Github)',
          click: async () => {
            const { shell} = require('electron');
            await shell.openExternal('https://github.com/lenguaje-latino/latino-editor');
          }
        },

        { type: 'separator' },

        {
          label: 'Herramientas de desarrollo',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click (item, focusedWindow) { if (focusedWindow) focusedWindow.webContents.toggleDevTools() }
        },

        { type: 'separator' },

        {
          label: 'Acerca del programa',
          role: 'help',
          click: async () => {
            const { shell } = require('electron');
            await shell.openExternal('https://latinoeditor.enzonotario.me');
          },
        },
      ],
    },
  ];

  return Menu.buildFromTemplate(menuTemplate);
}

export { createMenu };
