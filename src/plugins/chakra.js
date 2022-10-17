import Vue from 'vue';
import Chakra, * as ChakraUi from "@chakra-ui/vue";
import theme from "@/theme";

Object.entries(ChakraUi).forEach(([name, component]) => {
  Vue.component(name, component)
});

//HotFix: CImage and CAvatar appear to be the only components using process.browser:
//see more: https://github.com/chakra-ui/chakra-ui-vue/issues/434
if (typeof process === 'undefined' && typeof window.process === 'undefined') {
  window.process = {
    browser: typeof window !== 'undefined'
  }
}

Vue.use(Chakra, {
  extendTheme: {
    ...theme,
  }
});

