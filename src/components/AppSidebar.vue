<template>
  <div class="flex flex-col items-center min-h-full py-2 space-y-2">
    <v-tooltip right center>
      <template #activator="{ props }">
        <v-btn color="primary" icon="mdi-play" size="small" small depressed v-bind="props" @click="execute" />
      </template>

      <span>Ejecutar</span>
    </v-tooltip>

    <v-spacer />
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
  methods: {
    execute() {
      this.emitter.emit('executeCode');
    },
  },
};
</script>

<style scoped></style>
