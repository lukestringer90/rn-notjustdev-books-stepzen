import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

import BookItem from "../components/BookItem";

const query = gql`
  query SearchBooks($q: String) {
    googleBooksSearch(q: $q, country: "US") {
      items {
        id
        volumeInfo {
          authors
          averageRating
          description
          imageLinks {
            thumbnail
          }
          title
          subtitle
          industryIdentifiers {
            identifier
            type
          }
        }
      }
    }
    openLibrarySearch(q: $q) {
      docs {
        author_name
        title
        cover_edition_key
        isbn
      }
    }
  }
`;

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [search, setSearch] = useState("");

  // TODO: Would be better to use an enum here
  const [provider, setProvider] = useState<
    "googleBookSearch" | "openLibrarySearch"
  >("googleBookSearch");

  const [runQuery, { data, loading, error }] = useLazyQuery(query);

  const parseBook = (item: any): Book => {
    if (provider == "googleBookSearch") {
      return {
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks.thumbnail,
        authors: item.volumeInfo.authors,
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
      };
    } else {
      return {
        image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
        title: item.title,
        authors: item.author_name,
        isbn: item.isbn?.[0],
      };
    }
  };

  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <Button
          title="Search"
          onPress={() => runQuery({ variables: { q: search } })}
        />
      </View>

      <View style={styles.tabs}>
        <Text
          style={
            provider === "googleBookSearch"
              ? styles.selectedTab
              : styles.unSelectedTab
          }
          onPress={() => setProvider("googleBookSearch")}
        >
          Google Books
        </Text>
        <Text
          style={
            provider === "openLibrarySearch"
              ? styles.selectedTab
              : styles.unSelectedTab
          }
          onPress={() => setProvider("openLibrarySearch")}
        >
          Open Library
        </Text>
      </View>

      {loading && <ActivityIndicator />}
      {error && (
        <>
          , <Text style={styles.title}>Error Fetching books</Text>
          <Text>{error.message}</Text>
        </>
      )}
      <FlatList
        data={
          (provider == "googleBookSearch"
            ? data?.googleBooksSearch?.items
            : data?.openLibrarySearch.docs) || []
        }
        renderItem={({ item }) => <BookItem book={parseBook(item)} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
  },
  selectedTab: {
    fontWeight: "bold",
    color: "royalblue",
  },
  unSelectedTab: {},
});
