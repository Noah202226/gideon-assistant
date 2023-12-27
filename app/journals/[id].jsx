import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const journalItem = () => {
  const { id, title, description, state } = useLocalSearchParams();
  return (
    <View>
      <Text>journalItem - {id}</Text>
    </View>
  );
};

export default journalItem;

const styles = StyleSheet.create({});
