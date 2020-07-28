import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  useQuery,
  gql,
} from "@apollo/client";
import React from "react";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <h1>hello world</h1>
        <ExchangeRates />
      </>
    </ApolloProvider>
  );
}

const EXCHANGE_RATES = gql`
  query Test {
    getTrendingCharacters {
      name
      powerStats {
        power
        speed
        intelligence
      }
      alignment
      isTrending
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>{JSON.stringify(data.getTrendingCharacters[0])}</div>;
}

export default App;
