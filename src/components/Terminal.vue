<template>
  <div id="terminal" v-resize-observer="onResizeDebounced" class="resize relative h-full overflow-hidden" />
</template>

<script>
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';
import debounce from 'lodash.debounce';
import { mapState, mapWritableState } from 'pinia';
import { useEditorStore } from '../stores/editor';
import VueResizeObserver from 'vue-resize-observer';
import { useSettingsStore } from '../stores/settings';

export default {
  name: 'Terminal',
  directives: { 'resize-observer': VueResizeObserver },
  data() {
    return {
      terminal: null,
      fitAddon: null,
    };
  },
  computed: {
    ...mapState(useEditorStore, ['code']),
    ...mapState(useSettingsStore, ['terminalFontSize']),
    ...mapWritableState(useEditorStore, ['runningPids']),
  },
  mounted() {
    this.init();

    this.emitter.on('fileOpened', this.fileOpened);
    this.emitter.on('executeCode', this.executeCode);

    this.subscribeToSocket();
  },
  unmounted() {
    this.emitter.off('fileOpened', this.fileOpened);
    this.emitter.off('executeCode', this.executeCode);

    this.unsubscribeFromSocket();
  },
  methods: {
    init() {
      this.terminal = new Terminal({
        cursorBlink: true,
        fontSize: this.terminalFontSize,
      });

      this.fitAddon = new FitAddon();
      this.terminal.loadAddon(this.fitAddon);
      this.terminal.loadAddon(new WebLinksAddon());

      this.terminal.open(document.getElementById('terminal'));

      this.fitTerminal();

      this.terminal.onData((data) => {
        this.$socket.client.emit('input', data);
      });
    },

    executeCode() {
      if (this.runningPids && this.runningPids.length) {
        this.onPtyFinished();
      }

      this.clearTerminal();
      this.focusTerminal();
      this.$socket.client.emit('execute', this.code);
    },

    onPtyData(data) {
      this.terminal.write(data);
    },

    onPtyRunning(pid) {
      if (!this.runningPids.value) {
        this.runningPids.value = [];
      }

      if (!this.runningPids.value || this.runningPids.value.find((p) => p === pid)) {
        return;
      }

      this.runningPids.value.push(pid);
    },

    onPtyFinished(pid) {
      if (!this.runningPids.value) {
        return;
      }

      this.runningPids.value = this.runningPids.value.filter((p) => p !== pid);
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

    subscribeToSocket() {
      this.$socket.$subscribe('output', this.onPtyData);
      this.$socket.$subscribe('running', this.onPtyRunning);
      this.$socket.$subscribe('finished', this.onPtyFinished);
    },

    unsubscribeFromSocket() {
      this.$socket.$unsubscribe('output');
      this.$socket.$unsubscribe('running');
      this.$socket.$unsubscribe('finished');
    },
  },
};
</script>

<style>
.terminal.xterm {
  @apply w-full h-full;
}
</style>
