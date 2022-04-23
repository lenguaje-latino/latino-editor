<template>
  <v-layout column align-center class="min-h-full py-2 space-y-2">
    <v-tooltip right center>
      <template #activator="{ on }">
        <v-btn color="primary" fab small depressed @click="execute" v-on="on">
          <v-icon size="32">mdi-play</v-icon>
        </v-btn>
      </template>

      <span>Ejecutar</span>
    </v-tooltip>

    <v-spacer></v-spacer>
  </v-layout>
</template>

<script>
export default {
  name: 'AppSidebar',
  methods: {
    execute() {
      this.$root.$emit('executeCode');
    },
  },
};
</script>

<style scoped></style>
