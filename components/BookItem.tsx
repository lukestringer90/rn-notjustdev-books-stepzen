import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

type BookItemProps = {
  book: Book;
};

// Desctruction to props to access the 'book'
// 'book' is of type BookItemProps
const BookItem = ({ book }: BookItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{book.title}</Text>
        <Text>by {book.authors?.join(", ")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    flex: 1,
    aspectRation: 2 / 3,
    marginRight: 10,
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  title: {
    fontsize: 16,
    fontWeight: "500",
  },
});

export default BookItem;