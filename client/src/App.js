import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";

import CarForm from "./components/forms/CarForm";
import CarsList from "./components/lists/CarsList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Title 123</h1>
        <CarForm />
        <CarsList />
      </div>
    </ApolloProvider>
  );
};

export default App;
