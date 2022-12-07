import Vue from 'vue';
import pinia from '@/plugins/pinia';
import piniaPersistPlugin from 'pinia-plugin-persistedstate';
import { CThemeProvider, CReset } from '@chakra-ui/vue';
pinia.use(piniaPersistPlugin);

import App from '@/App.vue';
import router from '@/routes';

import '@/plugins/chakra.js';
import '@/css/reset.css';
import { apolloProvider } from '@/plugins/apollo';

Vue.config.productionTip = false;

new Vue({
  router,
  pinia,
  apolloProvider,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)]),
}).$mount('#app');
