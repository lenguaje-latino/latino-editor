import Vue from 'vue';
import App from './App.vue';
import pinia from './plugins/pinia';
import './plugins/vue-resize';

import './assets/tailwind.css';
import './assets/app.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  pinia,
}).$mount('#app');
