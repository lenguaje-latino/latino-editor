import Vue from 'vue';
import App from './App.vue';
import pinia from './plugins/pinia';
import { loadWASM } from 'onigasm';

import './plugins/vue-resize';
import './plugins/vue-split-view';

import './assets/tailwind.css';
import './assets/app.css';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'firacode/distr/fira_code.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

const init = async () => {
  await loadWASM(require('onigasm/lib/onigasm.wasm').default);

  new Vue({
    render: (h) => h(App),
    vuetify,
    pinia,
  }).$mount('#app');
};

init();
