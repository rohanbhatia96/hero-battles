import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./css/styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";
import Error404 from "./pages/404";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/character/:id/:fetchFrom?" exact component={Character} />
          <Route path="/" component={Error404} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
