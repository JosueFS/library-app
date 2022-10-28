import path from 'path';
import vue from '@vitejs/plugin-vue2';
// import graphqlPlugin from 'vite-plugin-graphql'

export default {
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         vendorApollo: [
  //           'vue-apollo',
  //           'apollo-cache-inmemory',
  //           'apollo-client',
  //           'apollo-link',
  //           'apollo-link-context',
  //           'apollo-link-http'
  //         ],
  //       }
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    // graphqlPlugin,
  ],
};
