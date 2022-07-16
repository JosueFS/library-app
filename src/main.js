import Vue from "vue";
import App from "./App.vue";
import {
  CThemeProvider,
  CReset
} from "@chakra-ui/vue";

import "@/plugins/chakra.js";

Vue.config.productionTip = false;

//HotFix: CImage and CAvatar appear to be the only components using process.browser:
//see more: https://github.com/chakra-ui/chakra-ui-vue/issues/434
if (typeof process === 'undefined' && typeof window.process === 'undefined') {
  window.process = {
    browser: typeof window !== 'undefined'
  }
}

new Vue({
  render: (h) => h(CThemeProvider, [h(CReset), h(App)]),
}).$mount('#app');
