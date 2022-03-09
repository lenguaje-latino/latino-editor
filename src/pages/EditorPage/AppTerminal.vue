<template>
  <div id="terminal" class="console"></div>
</template>

<script>
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
// const os = require('os');
const pty = require('node-pty');
const fs = require('fs');
import 'xterm/css/xterm.css'

export default {
  name: 'AppTerminal',
  data () {
    return {
      terminal: null,
      ptyProcess: null,
    }
  },
  mounted () {
    this.init();

    this.$root.$on('executeCode', this.executeCode);
  },
  destroyed() {
    this.$root.$off('executeCode', this.executeCode);
  },
  methods: {
    init() {
      this.terminal = new Terminal({})

      const fitAddon = new FitAddon();
      this.terminal.loadAddon(fitAddon);

      this.terminal.open(document.getElementById('terminal'))
      fitAddon.fit();
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
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env,
      });

      this.terminal.onData(data => {
        this.ptyProcess.write(data);
      });

      this.ptyProcess.on('data', (data) => {
        this.terminal.write(data);
      });
    },

    clearTerminal() {
      this.terminal.write('\x1bc')
    },
  },
}
</script>

<style scoped></style>
