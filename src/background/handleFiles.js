import path from 'path';
import { app } from 'electron';
import fs from 'fs';

function openTemporaryFile(filename, content) {
  const filepath = path.join(app.getPath('temp'), filename);

  fs.writeFileSync(filepath, content, 'utf-8');

  return filepath;
}

function saveFile(filepath, content) {
  fs.writeFileSync(filepath, content, 'utf-8');

  return filepath;
}

export { openTemporaryFile, saveFile };
