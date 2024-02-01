import { Link, router } from "expo-router";
import moment from "moment";
import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { List } from "react-native-paper";

const Item = ({ title, description, id, state }) => (
  <Pressable
    style={{ backgroundColor: "whitesmoke", marginVertical: 5 }}
    onPress={() => {
      router.push({
        pathname: "/tasks/[id]",
        params: { id, title, description, state }
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
            description={`${item.description} 
${moment(item.deadlLine.toDate()).format("MMMM DD YYYY")}`}
            key={item.id}
            state={item.state}
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
    padding: 10
  },
  item: {
    backgroundColor: "#09c2f0",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 150
  }
});

export default ScheduleList;
