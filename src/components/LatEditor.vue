<template>
  <MonacoEditor
    ref="editor"
    v-model="code"
    theme="vs-dark"
    language="javascript"
    :options="options"
    class="w-full h-full overflow-hidden"
  ></MonacoEditor>
</template>

<script>
import MonacoEditor, { monaco } from 'monaco-editor-vue';

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
      },
    };
  },
  mounted() {
    this.$refs.editor.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      this.execute();
    });
  },
  methods: {
    execute() {
      this.$root.$emit('executeCode', this.code);
    },
  },
};
</script>

<style scoped></style>
