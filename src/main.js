import Vue from 'vue';
import App from './App.vue';
import pinia from './plugins/pinia';
import { loadWASM } from 'onigasm';

import './plugins/vue-resize';
import './plugins/vue-split-view';

import './assets/tailwind.css';
import './assets/app.css';

Vue.config.productionTip = false;

const init = async () => {
  await loadWASM(require('onigasm/lib/onigasm.wasm'));

  new Vue({
    render: (h) => h(App),
    pinia,
  }).$mount('#app');
};

init();
