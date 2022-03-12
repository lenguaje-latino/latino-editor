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
// const os = require('os');
const pty = require('node-pty');
const fs = require('fs');

export default {
  name: 'LatTerminal',
  data() {
    return {
      terminal: null,
      fitAddon: null,
      ptyProcess: null,
    };
  },
  mounted() {
    this.init();

    this.$root.$on('executeCode', this.executeCode);
  },
  destroyed() {
    this.$root.$off('executeCode', this.executeCode);
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
    },

    executeCode(code) {
      if (this.ptyProcess && this.ptyProcess.pid) {
        this.ptyProcess.kill();
        this.ptyProcess = null;
      }

      this.clearTerminal();

      fs.writeFileSync('temp.lat', code, 'utf-8');

      this.ptyProcess = pty.spawn('/usr/local/bin/latino', ['temp.lat'], {
        name: 'xterm-color',
        // cols: 80,
        // rows: 30,
        cwd: process.cwd(),
        env: process.env,
      });

      this.terminal.onData((data) => {
        this.ptyProcess.write(data);
      });

      this.ptyProcess.on('data', (data) => {
        this.terminal.write(data);
      });
    },

    clearTerminal() {
      this.terminal.write('\x1bc');
    },

    fitTerminal() {
      this.fitAddon.fit();
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
