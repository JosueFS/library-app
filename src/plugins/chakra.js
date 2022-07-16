import Vue from 'vue';
import Chakra, * as ChakraUi from "@chakra-ui/vue";

Object.entries(ChakraUi).forEach(([name, component]) => {
  // console.log(name, component)
  Vue.component(name, component)
});

Vue.use(Chakra);

