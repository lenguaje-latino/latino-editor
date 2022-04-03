<template>
  <div id="terminal" class="relative h-full overflow-hidden">
    <resize-observer @notify="onResizeDebounced" />
  </div>
</template>

<script>
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import debounce from 'lodash.debounce';
import { ipcRenderer } from 'electron';
import getPlatform from '@/get-platform';
import appRootDir from 'app-root-dir';
import { dirname, join } from 'path';

export default {
  name: 'Terminal',
  data() {
    return {
      terminal: null,
      fitAddon: null,
    };
  },
  mounted() {
    this.init();

    this.$root.$on('fileOpened', this.fileOpened);
    ipcRenderer.on('executeCode', this.executeCode);
    ipcRenderer.on('pty.onData', this.onPtyData);
  },
  destroyed() {
    this.$root.$off('fileOpened', this.fileOpened);
    ipcRenderer.removeListener('executeCode', this.executeCode);
    ipcRenderer.removeListener('pty.onData', this.onPtyData);
  },
  methods: {
    init() {
      this.terminal = new Terminal({
        cursorBlink: true,
      });

      this.fitAddon = new FitAddon();
      this.terminal.loadAddon(this.fitAddon);

      this.terminal.open(document.getElementById('terminal'));

      this.fitTerminal();

      this.terminal.onData((data) => {
        ipcRenderer.send('terminalKeystroke', {
          data,
        });
      });
    },

    executeCode(event, filepath) {
      this.clearTerminal();

      this.focusTerminal();

      ipcRenderer.send('runCommand', {
        command: this.getCommand(),
        commandArgs: this.getCommandArgs(filepath),
      });
    },

    onPtyData(event, data) {
      this.terminal.write(data);
    },

    fileOpened() {
      this.clearTerminal();
    },

    clearTerminal() {
      this.terminal.write('\x1bc');
    },

    fitTerminal() {
      this.fitAddon.fit();
    },

    focusTerminal() {
      this.terminal.focus();
    },

    onResizeDebounced: debounce(function () {
      this.fitTerminal();
    }, 10),

    getCommand() {
      if ('win' === getPlatform()) {
        return 'latino.exe';
      }
      return process.env.NODE_ENV === 'production'
        ? join(dirname(appRootDir.get()), 'Resources', 'bin', 'latino')
        : join(appRootDir.get(), 'resources', getPlatform(), 'latino');
    },

    getCommandArgs(filepath) {
      return [filepath];
    },
  },
};
</script>

<style>
.terminal.xterm,
.xterm-viewport {
  @apply w-full h-full;
}
</style>
