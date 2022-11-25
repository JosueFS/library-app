import Vue from 'vue';
import VueApollo from 'vue-apollo';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

Vue.use(VueApollo);

// HTTP connection to the API
let httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4001/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // const Authorization = (await Auth.currentSession()).getIdToken().getJwtToken()
  // const authorizationHeader = Authorization ? { Authorization } : {}
  return {
    headers: {
      ...headers,
      // ...authorizationHeader
    },
  };
});

// Concat all the http link parts
httpLink = authLink.concat(httpLink);

// Cache implementation
const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    return object.id || object._id;
  },
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: import.meta.env.VITE_ENV !== 'production',
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  // defaultOptions: {
  //   $query: {
  //     fetchPolicy: 'cache-and-network'
  //   }
  // },
  errorHandler(error) {
    // eslint-disable-next-line no-console
    console.log(
      '%cError',
      'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
      error.message
    );
  },
});

export { apolloProvider };
