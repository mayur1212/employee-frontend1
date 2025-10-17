import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { API_URL } from "./api.js"; // ✅ Correct path to api.js

const client = new ApolloClient({
  link: new HttpLink({ uri: `${API_URL}/graphql` }), // GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
