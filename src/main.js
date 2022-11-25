import Vue from 'vue';
import { CThemeProvider, CReset } from '@chakra-ui/vue';

import App from '@/App.vue';
import router from '@/routes';

import '@/plugins/chakra.js';
import { apolloProvider } from '@/plugins/apollo';

import '@/css/reset.css';

Vue.config.productionTip = false;

console.log(router);

new Vue({
  router,
  apolloProvider,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)]),
}).$mount('#app');
