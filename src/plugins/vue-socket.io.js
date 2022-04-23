import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const socket = io(process.env.VUE_APP_SOCKET_IO_HOST);

Vue.use(VueSocketIOExt, socket);
