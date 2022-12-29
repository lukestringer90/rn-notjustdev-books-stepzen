import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useContext } from "react";
import { useMyBooks as useMyBooks } from "../components/context/MyBooksProvider";
import BookItem from "../components/BookItem";

export default function TabTwoScreen() {
  const { savedBooks } = useMyBooks();

  return (
    <View style={styles.container}>
      <FlatList
        data={savedBooks}
        renderItem={({ item }) => <BookItem book={item} />}
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
});
