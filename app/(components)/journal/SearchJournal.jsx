import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";

const SearchJournal = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default SearchJournal;

const styles = StyleSheet.create({});
