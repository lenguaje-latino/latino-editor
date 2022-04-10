<template>
  <div id="terminal" class="relative h-full overflow-hidden">
    <resize-observer @notify="onResizeDebounced" />
  </div>
</template>

<script>
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';
import debounce from 'lodash.debounce';
import { mapState } from 'pinia';
import { useEditorStore } from '@/stores/editor';

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
    this.$root.$on('executeCode', this.executeCode);

    this.$socket.$subscribe('output', this.onPtyData);
  },
  destroyed() {
    this.$root.$off('fileOpened', this.fileOpened);
    this.$root.$off('executeCode', this.executeCode);

    this.$socket.$unsubscribe('output');
  },
  computed: {
    ...mapState(useEditorStore, ['code']),
  },
  methods: {
    init() {
      this.terminal = new Terminal({
        cursorBlink: true,
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
      this.clearTerminal();
      this.focusTerminal();
      this.$socket.client.emit('execute', this.code);
    },

    onPtyData(data) {
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
  },
};
</script>

<style>
.terminal.xterm,
.xterm-viewport {
  @apply w-full h-full;
}
</style>
