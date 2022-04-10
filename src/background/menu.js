import { Menu } from 'electron';
import { join } from 'path';

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
          role: 'selectall',
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
        { label: 'Pantalla completa', role: 'togglefullscreen' },
      ],
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
            const { shell } = require('electron');
            await shell.openExternal('https://github.com/lenguaje-latino/latino-editor');
          },
        },

        ...(isDevelopment
          ? [
              { type: 'separator' },

              {
                label: 'Herramientas de desarrollo',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                  if (focusedWindow) {
                    focusedWindow.webContents.toggleDevTools();
                  }
                },
              },
            ]
          : []),

        { type: 'separator' },

        {
          label: 'Acerca del programa',
          click: (item, focusedWindow) => {
            const openAboutWindow = require('electron-about-window').default;

            openAboutWindow({
              // eslint-disable-next-line no-undef
              icon_path: join(__static, 'icon.png'),
              description: 'Editor de texto para el Lenguaje Latino',
              copyright: 'Copyleft (c) 2022, Lenguaje Latino',
              package_json_dir: __dirname,
              // eslint-disable-next-line no-undef
              about_page_dir: __static,
              // eslint-disable-next-line no-undef
              css_path: __static + '/about-window.ui.css',
              bug_report_url: 'https://github.com/lenguaje-latino/latino-editor/issues',
              homepage: 'https://github.com/lenguaje-latino/latino-editor',
              license: 'MIT',
              win_options: {
                parent: focusedWindow,
                modal: true,
                width: 300,
                height: 450,
                center: true,
                resizable: false,
                minimizable: false,
                maximizable: false,
                alwaysOnTop: true,
              },
              use_version_info: true,
              show_close_button: 'Cerrar',
            });
          },
        },
      ],
    },
  ];

  return Menu.buildFromTemplate(menuTemplate);
}

export { createMenu };
