import Vue from 'vue';
import Chakra, * as ChakraUi from '@chakra-ui/vue';

const customBreakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

Object.entries(ChakraUi).forEach(([name, component]) => {
  // console.log(name, component);
  Vue.component(name, component);
});

//HotFix: CImage and CAvatar appear to be the only components using process.browser:
//see more: https://github.com/chakra-ui/chakra-ui-vue/issues/434
if (typeof process === 'undefined' && typeof window.process === 'undefined') {
  window.process = {
    browser: typeof window !== 'undefined',
  };
}

Vue.use(Chakra, {
  extendTheme: {
    breakpoints: customBreakpoints,
    fonts: {
      heading: 'Nunito, sans-serif',
      body: 'Nunito, system-ui, sans-serif',
      mono: 'Menlo, monospace',
    },
  },
});
