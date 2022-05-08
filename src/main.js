import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';
import VueSocketIOExt from 'vue-socket.io-extended';
import VueShortkey from 'vue-three-shortkey';
import $socket from './plugins/socket-instance';
import mitt from 'mitt';
import VueGtag from 'vue-gtag';
import './assets/tailwind.css';
import './assets/app.css';

loadFonts();

const emitter = mitt();

const app = createApp(App)
  .use(vuetify)
  .use(createPinia())
  .use(VueSocketIOExt, $socket)
  .use(VueShortkey)
  .use(VueGtag, {
    config: {
      id: import.meta.env.VITE_GTAG_ID,
    },
  })
  .provide('emitter', emitter);

app.config.globalProperties.emitter = emitter;

app.mount('#app');
