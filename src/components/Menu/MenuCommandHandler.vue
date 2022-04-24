<template>
  <div></div>
</template>

<script setup>
import { inject } from 'vue';
import { useEditorStore } from '../../stores/editor';
import { useFileSystemAccess } from '@vueuse/core';

const emitter = inject('emitter');

const editorStore = useEditorStore();

const fileSystemAccess = useFileSystemAccess({
  dataType: 'Text',
  types: [
    {
      description: 'Latino',
      accept: {
        'text/plain': ['.lat'],
      },
    },
  ],
});

emitter.on('menu-command', async (args) => {
  switch (args.command) {
    case 'new-file':
      return handleNewFileCommand(args);
    case 'ask-open-file':
      return await handleAskOpenFileCommand(args);
    case 'open-file':
      return await handleOpenFileCommand(args);
    case 'ask-save-file':
      return await handleAskSaveFileCommand(args);
    case 'save-file-as':
      return handleSaveFileAsCommand(args);
    case 'save-file':
      return handleSaveFileCommand(args);
    case 'fallback':
    default:
      return null;
  }
});

function handleNewFileCommand(args) {
  if (!args.confirmed && editorStore.hasUnsavedChanges) {
    return showUnsavedDialog(args);
  }

  editorStore.openNewFile();
}

async function handleAskOpenFileCommand(args) {
  if (!args.confirmed && editorStore.hasUnsavedChanges) {
    await showUnsavedDialog(args);
    return;
  }

  emitter.emit('menu-command', {
    command: 'open-file',
  });
}

async function handleOpenFileCommand(args) {
  await fileSystemAccess.open();

  editorStore.openFile(fileSystemAccess.fileName.value, fileSystemAccess.data.value, args.temporary);
}

async function handleAskSaveFileCommand() {
  if (editorStore.isTemporaryFile) {
    emitter.emit('menu-command', {
      command: 'save-file-as',
    });
  } else {
    emitter.emit('menu-command', {
      command: 'save-file',
    });
  }
}

async function handleSaveFileAsCommand() {
  fileSystemAccess.data.value = editorStore.code;
  await fileSystemAccess.saveAs();
}

async function handleSaveFileCommand() {
  fileSystemAccess.data.value = editorStore.code;
  await fileSystemAccess.save();
}

async function showUnsavedDialog(args) {
  const answer = await window.confirm('Cambios sin guardar');

  if (true === answer) {
    emitter.emit('menu-command', {
      ...args,
      confirmed: true,
    });
  }
}
</script>

<style scoped></style>