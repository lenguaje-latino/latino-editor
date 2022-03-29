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

    // {
    //   label: 'Editar',
    //   submenu: [
    //     {
    //       label: 'Deshacer',
    //       role: 'undo',
    //     },
    //     {
    //       label: 'Rehacer',
    //       role: 'redo',
    //     },
    //     {
    //       type: 'separator',
    //     },
    //     {
    //       label: 'Cortar',
    //       role: 'cut',
    //     },
    //     {
    //       label: 'Copiar',
    //       role: 'copy',
    //     },
    //     {
    //       label: 'Pegar',
    //       role: 'paste',
    //     },
    //     {
    //       label: 'Seleccionar todo',
    //       role: 'selectall',
    //     },
    //   ],
    // },

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
          label: 'Acerca de',
          role: 'help',
          accelerator: 'F11',
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
