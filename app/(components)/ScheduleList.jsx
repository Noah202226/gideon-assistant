import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { List } from "react-native-paper";

const Item = ({ title, description, id }) => (
  <TouchableOpacity key={id} onPress={() => console.log(title)}>
    <List.Item
      key={id}
      title={title}
      description={description}
      left={(props) => <List.Icon {...props} icon="folder" />}
    />
  </TouchableOpacity>
);

const ScheduleList = ({ list }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Item
            title={item.taskName}
            description={item.description}
            key={item.id}
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
