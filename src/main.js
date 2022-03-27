import Vue from 'vue';
import App from './App.vue';
import pinia from './plugins/pinia';
import './plugins/vue-resize';

import './assets/tailwind.css';
import './assets/app.css';
import { loadWASM } from 'onigasm';

Vue.config.productionTip = false;

const init = async () => {
  await loadWASM(require('onigasm/lib/onigasm.wasm'));

  new Vue({
    render: (h) => h(App),
    pinia,
  }).$mount('#app');
};

init();
