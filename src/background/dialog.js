import { app, dialog } from 'electron';
import { join } from 'path';

async function showOpenFileDialog() {
  return await dialog.showOpenDialog({
    defaultPath: app.getPath('home'),
    properties: ['openFile'],
    filters: [
      { name: 'Latino', extensions: ['lat'] },
      { name: 'Todos los archivos', extensions: ['*'] },
    ],
  });
}

async function showSaveFileDialog(filename = null) {
  filename = filename || 'codigo.lat';

  return await dialog.showSaveDialog({
    title: 'Guardar código Latino',
    defaultPath: join(app.getPath('home'), filename),
    properties: ['createDirectory'],
    filters: [
      { name: 'Latino', extensions: ['lat'] },
      { name: 'Todos los archivos', extensions: ['*'] },
    ],
  });
}

async function showUnsavedFileDialog() {
  return await dialog.showMessageBox({
    type: 'question',
    buttons: ['Si', 'No'],
    title: 'Cambios sin guardar',
    message: 'Si continuas, perderás los cambios. \n ¿Deseas continuar sin guardar los cambios?',
  });
}

export { showOpenFileDialog, showSaveFileDialog, showUnsavedFileDialog };
