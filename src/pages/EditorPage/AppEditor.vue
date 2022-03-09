<template>
  <prism-editor class="app-editor w-full h-full" v-model="code" :highlight="highlighter" line-numbers @keyup="onKeyUp" @keydown="onKeyDown"></prism-editor>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';

export default {
  name: "AppEditor",
  components: {
    PrismEditor,
  },
  props: {
    value: null,
  },
  data() {
    return {
      code: '#calcula el mayor de tres numeros\n' +
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
          'escribir("el mayor es: " .. max)'
    };
  },
  watch: {
    value(value) {
      this.code = value
    },

    code(value) {
      this.$emit('input', value);
    },
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js);
    },

    onKeyUp($event) {
      if ($event.ctrlKey && 'Enter' === $event.key) {
        this.execute();
      }
    },

    onKeyDown($event) {
      if ($event.ctrlKey && 'Enter' === $event.key) {
        $event.preventDefault();
      }
    },

    execute() {
      this.$root.$emit('executeCode', this.code);
    }
  },
}
</script>

<style>
/* required class */
.app-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
