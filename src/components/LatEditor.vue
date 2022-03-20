<template>
  <MonacoEditor ref="editor" v-model="code" :options="options" class="w-full h-full overflow-hidden"></MonacoEditor>
</template>

<script>
import MonacoEditor, { monaco } from 'monaco-editor-vue';
import { loadWASM } from 'onigasm';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';
const { ipcRenderer } = require('electron');
const fs = require('fs');

export default {
  name: 'LatEditor',
  components: {
    MonacoEditor,
  },
  data() {
    return {
      code:
        '#calcula el mayor de tres numeros\n' +
        '#leer los 3 numeros por teclado con la funcion leer()\n' +
        'escribir("ingresa el primer numero:")\n' +
        'a=leer()\n' +
        'escribir("ingresa el segundo numero:")\n' +
        'b=leer()\n' +
        'escribir("ingresa el tercer numero:")\n' +
        'c=leer()\n' +
        '\n' +
        '#aqui almacenaremos el numero mayor\n' +
        'si a > b\n' +
        '    max = a\n' +
        'sino \n' +
        '    si b > c\n' +
        '        max = b\n' +
        '    sino\n' +
        '        max = c\n' +
        '    fin\n' +
        'fin\n' +
        '#mostrar el resultado a consola con la funcion escribir()\n' +
        'escribir("el mayor es: " .. max)',

      options: {
        automaticLayout: true,
        vertical: 'visible',
        horizontal: 'visible',
        theme: 'vs-dark',
        fontFamily: 'Fira Code',
        fontSize: 18,
        language: 'latino',
        renderWhitespace: 'all',
      },
    };
  },
  async mounted() {
    await this.setupMonacoEditor();

    this.$root.$on('saveAndExecute', this.saveAndExecute);
  },
  destroyed() {
    this.$root.$off('saveAndExecute', this.saveAndExecute);
  },
  methods: {
    async setupMonacoEditor() {
      await loadWASM('https://cdn.jsdelivr.net/npm/onigasm@2.2.5/lib/onigasm.wasm'); // See https://www.npmjs.com/package/onigasm#light-it-up

      const registry = new Registry({
        getGrammarDefinition: async () => {
          return {
            format: 'json',
            content: fs.readFileSync('./public/latino.tmLanguage.json', 'utf-8'),
          };
        },
      });

      const grammars = new Map();
      grammars.set('latino', 'source.latino');

      monaco.languages.register({ id: 'latino' });

      await wireTmGrammars(monaco, registry, grammars, this.$refs.editor.editor);

      this.$refs.editor.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        this.saveAndExecute();
      });
    },

    saveAndExecute() {
      this.saveFile();
      this.execute();
    },

    saveFile() {
      ipcRenderer.send('saveFile', {
        filename: 'temp.lat',
        content: this.code,
      });
    },

    execute() {
      ipcRenderer.send('executeCode', {
        filename: 'temp.lat',
      });
    },
  },
};
</script>

<style scoped></style>
