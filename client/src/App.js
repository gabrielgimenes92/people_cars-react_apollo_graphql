import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Divider } from "antd";
import "./App.css";

import Header from "./components/layout/Header";
import CarForm from "./components/forms/CarForm";
import PersonForm from "./components/forms/PersonForm";
import PeopleList from "./components/lists/PeopleList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />

        <PersonForm />
        <CarForm />
        <Divider />
        <div className="lists">
          <PeopleList />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
