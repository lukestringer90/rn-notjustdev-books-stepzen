import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const API_KEY =
  "juchen::stepzen.net+1000::db4e50551ac04de32fdc2dfd937c6972bbb20a9be2170b0fbe5a47216a43bad0";
const client = new ApolloClient({
  uri: "https://juchen.stepzen.net/api/turbulent-chimp/__graphql",
  headers: {
    Authorization: `APIkey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* Embed in higher order component ApolloProvider*/}
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
