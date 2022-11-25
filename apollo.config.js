module.exports = {
  client: {
    service: {
      name: 'my-service',
      url: 'http://localhost:4001/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
  },
};
