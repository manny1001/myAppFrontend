import React from "react";
import { Context, ContextConsumer } from "./Context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
/* const token = async () => {
  try {
    await AsyncStorage.getItem("accessToken");
    if (value !== null) {
      console.log(value);
    }
  } catch (e) {
    // error reading value
  }
}; */
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  /*   */

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjExMzgwOTQzLCJleHAiOjE1MDE2MTEzODA5NDN9.mfOUdsKxyjMdIE7EQX7PrGE0dQ_oU939-Ht1OdNclRw",
    },
  };
});
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});
const Index = () => {
  return (
    <ApolloProvider client={client}>
      <Context>
        <ContextConsumer>
          {(context) => {
            return <App context={context} />;
          }}
        </ContextConsumer>
      </Context>
    </ApolloProvider>
  );
};

export default Index;
