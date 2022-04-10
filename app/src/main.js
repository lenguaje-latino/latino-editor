import Vue from 'vue';
import App from './App.vue';
import pinia from './plugins/pinia';

import './plugins/vue-resize';
import './plugins/vue-split-view';
import './plugins/vue-socket.io';

import './assets/tailwind.css';
import './assets/app.css';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'firacode/distr/fira_code.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  pinia,
}).$mount('#app');
