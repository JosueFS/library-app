import Vue from "vue";
import App from "@/App.vue";
import {
  CThemeProvider,
  CReset
} from "@chakra-ui/vue";

import "@/plugins/chakra.js";
import router from "@/routes";

import "@/css/reset.css";

Vue.config.productionTip = false;

console.log(router);

new Vue({
  router,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)]),
}).$mount('#app');
