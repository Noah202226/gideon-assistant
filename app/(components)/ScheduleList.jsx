import { Link, router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { List } from "react-native-paper";

const Item = ({ title, description, id }) => (
  <Pressable
    onPress={() => {
      router.push({
        pathname: "/tasks/[id]",
        params: { id, title, description },
      });
    }}
  >
    <List.Item
      title={title}
      description={description}
      right={(props) => <List.Icon {...props} icon="folder" />}
    />
  </Pressable>
);

const ScheduleList = ({ list }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Item
            title={item.taskName}
            description={`${item.description} = ${item.state}`}
            key={item.id}
            id={item.id}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#09c2f0",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 150,
  },
});

export default ScheduleList;
