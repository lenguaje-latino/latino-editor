'use strict';

import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { createMenu } from './background/menu';
import { openTemporaryFile, saveFile } from './background/handleFiles';
import { calculateWindowSize } from './background/calculateWindowSize';
import { showOpenFileDialog, showSaveFileDialog, showUnsavedFileDialog } from './background/dialog';

const isDevelopment = process.env.NODE_ENV !== 'production';

let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true, supportFetchAPI: true } },
]);

async function createWindow() {
  const windowSize = calculateWindowSize();

  win = new BrowserWindow({
    minWidth: windowSize.minWidth,
    width: windowSize.width,
    minHeight: windowSize.minHeight,
    height: windowSize.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.setMenu(createMenu());
}

app.allowRendererProcessReuse = false; // Necesario para que funcione node-pty.

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

ipcMain.on('saveFile', (event, args) => {
  const filepath = saveFile(args.filepath, args.content);

  event.sender.send('fileSaved', filepath);
});

ipcMain.on('executeCode', (event, args) => {
  event.sender.send('executeCode', args.filepath);
});

ipcMain.on('showOpenDialog', async (event) => {
  const openFileDialog = await showOpenFileDialog();

  if (openFileDialog.canceled || !openFileDialog || !openFileDialog.filePaths.length) {
    return;
  }

  const filepath = openFileDialog.filePaths[0].toString();

  event.sender.send('menu-command', {
    command: 'open-file',
    filepath,
  });
});

ipcMain.on('showSaveDialog', async (event, args) => {
  const saveFileDialog = await showSaveFileDialog(args.filename);

  if (saveFileDialog.canceled || !saveFileDialog || !saveFileDialog.filePath.length) {
    return;
  }

  const filepath = saveFileDialog.filePath.toString();

  saveFile(filepath, args.content);

  event.sender.send('menu-command', {
    command: 'open-file',
    filepath,
  });
});

ipcMain.on('showUnsavedFileDialog', async (event, args) => {
  const unsavedFileDialog = await showUnsavedFileDialog();

  if (unsavedFileDialog.response === 1) {
    return;
  }

  event.sender.send('menu-command', {
    ...args,
    confirmed: true,
  });
});

ipcMain.on('openTemporaryFile', (event, args) => {
  const filepath = openTemporaryFile(args.filename, args.content);

  event.sender.send('menu-command', {
    command: 'open-file',
    filepath,
    temporary: true,
  });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
