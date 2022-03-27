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

const pty = require('node-pty');
const path = require('path');
const { ipcRenderer } = require('electron');

export default {
  name: 'Terminal',
  data() {
    return {
      terminal: null,
      fitAddon: null,
      ptyProcess: null,
    };
  },
  mounted() {
    this.init();

    this.$root.$on('fileOpened', this.fileOpened);
    ipcRenderer.on('executeCode', this.executeCode);
  },
  destroyed() {
    this.$root.$off('fileOpened', this.fileOpened);
    ipcRenderer.removeListener('executeCode', this.executeCode);
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
        if (!this.ptyProcess) {
          return;
        }

        this.ptyProcess.write(data);
      });
    },

    executeCode(event, filepath) {
      this.closeTerminal();

      this.focusTerminal();

      const latinoPath =
        process.env.NODE_ENV === 'production' ? path.join(__dirname, 'bin/linux/latino') : './bin/linux/latino';

      this.ptyProcess = pty.spawn(latinoPath, [filepath], {
        name: 'xterm-color',
        cwd: process.cwd(),
        env: process.env,
      });

      this.ptyProcess.on('data', (data) => {
        this.terminal.write(data);
      });
    },

    fileOpened() {
      this.closeTerminal();
    },

    closeTerminal() {
      if (this.ptyProcess && this.ptyProcess.pid) {
        this.ptyProcess.kill();
        this.ptyProcess = null;
      }

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
  },
};
</script>

<style>
.terminal.xterm,
.xterm-viewport {
  @apply w-full h-full;
}
</style>
