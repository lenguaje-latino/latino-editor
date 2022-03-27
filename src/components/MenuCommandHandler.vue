<script>
import { ipcRenderer } from 'electron';
import { mapActions, mapState } from 'pinia/dist/pinia';
import { useEditorStore } from '@/stores/editor';

export default {
  name: 'MenuCommandHandler',
  render: () => {
    return null;
  },
  mounted() {
    ipcRenderer.on('menu-command', this.handleMenuCommand);
  },
  destroyed() {
    ipcRenderer.removeListener('menu-command', this.handleMenuCommand);
  },
  computed: {
    ...mapState(useEditorStore, ['code', 'filepath', 'filename', 'isTemporaryFile', 'hasUnsavedChanges']),
  },
  methods: {
    async handleMenuCommand($event, args) {
      switch (args.command) {
        case 'new-file':
          return this.handleNewFileCommand(args);
        case 'ask-open-file':
          return await this.handleAskOpenFileCommand(args);
        case 'open-file':
          return await this.handleOpenFileCommand(args);
        case 'ask-save-file':
          return await this.handleAskSaveFileCommand(args);
        case 'save-file-as':
          return this.handleSaveFileAsCommand(args);
      }
    },

    handleNewFileCommand(args) {
      if (!args.confirmed && this.hasUnsavedChanges) {
        return this.showUnsavedDialog(args);
      }

      this.openTemporaryFile();
    },

    async handleAskOpenFileCommand(args) {
      if (!args.confirmed && this.hasUnsavedChanges) {
        return this.showUnsavedDialog(args);
      }

      ipcRenderer.send('showOpenDialog');
    },

    async handleOpenFileCommand(args) {
      this.openFile(args.filepath, args.temporary);
      this.$root.$emit('fileOpened', {
        filepath: args.filepath,
        tempoarary: args.tempoarary,
      });
    },

    async handleAskSaveFileCommand() {
      if (this.isTemporaryFile) {
        ipcRenderer.send('showSaveDialog', {
          content: this.code,
          filename: this.filename,
        });
      } else {
        ipcRenderer.send('saveFile', {
          content: this.code,
          filepath: this.filepath,
        });
      }
    },

    handleSaveFileAsCommand() {
      ipcRenderer.send('showSaveDialog', {
        content: this.code,
        filename: this.filename,
      });
    },

    showUnsavedDialog(args) {
      ipcRenderer.send('showUnsavedFileDialog', args);
    },

    ...mapActions(useEditorStore, ['openFile', 'openTemporaryFile']),
  },
};
</script>
