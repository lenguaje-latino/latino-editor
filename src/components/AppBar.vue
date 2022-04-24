<template>
  <v-row class="w-full h-full" no-gutters>
    <v-col cols="4" class="h-full">
      <v-row no-gutters justify="start" class="h-full space-x-1">
        <v-col no-gutters class="grow-0">
          <AppMenu></AppMenu>
        </v-col>

        <v-col no-gutters class="h-full py-1">
          <v-img src="/assets/logo.png" class="w-10" />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="4" no-gutters class="h-full">
      <v-row no-gutters justify="center" align="center" class="h-full">
        <v-btn
          text
          :prepend-icon="$socket.connected ? 'mdi-play' : 'mdi-lan-connect'"
          height="30"
          class="bg-green-700 text-green-300 bg-opacity-50"
          :disabled="!$socket.connected"
          @click="execute"
        >
          {{ $socket.connected ? 'Ejecutar' : 'Conectando...' }}
        </v-btn>
      </v-row>
    </v-col>

    <v-col cols="4" />
  </v-row>
</template>

<script>
import AppMenu from './AppMenu.vue';

export default {
  name: 'AppBar',
  components: { AppMenu },
  methods: {
    execute() {
      this.emitter.emit('executeCode');
    },
  },
};
</script>

<style scoped></style>
