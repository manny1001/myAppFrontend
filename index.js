import React from "react";
import { Context, ContextConsumer } from "./Context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
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
