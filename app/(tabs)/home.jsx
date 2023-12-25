import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";

import SearchStack from "../(components)/SearchTask";
import SegmentedButtonTask from "../(components)/SegmentedButtonTask";
import ScheduleList from "../(components)/ScheduleList";
import AddTaskFAB from "../(components)/AddTaskFAB";

import { db } from "../firebaseConfig";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

const home = () => {
  const [isGettingTasks, setIsGettingTasks] = React.useState(true);
  const [visible, setVisible] = React.useState(false);

  const [newTaskName, setNewTaskName] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [taskList, setTaskList] = React.useState([]);

  const addTask = () => {
    addDoc(collection(db, "tasks"), {
      taskName: newTaskName,
      description: "New Added Task.",
      state: "Ongoing",
    })
      .then(() => {
        console.log("task added");
        setVisible(false);
      })
      .catch((e) => {
        console.log(e);
        setVisible(false);
      });
  };

  React.useEffect(() => {
    onSnapshot(collection(db, "tasks"), (snapshot) => {
      const data = [];
      snapshot.docs.forEach((doc) =>
        data.push({
          id: doc.id,
          ...doc.data(),
        })
      );

      setTaskList(data);
      setIsGettingTasks(false);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>New Task</Text>
          <TextInput
            mode="outlined"
            value={newTaskName}
            onChangeText={(e) => setNewTaskName(e)}
          />

          <Button mode="contained-tonal" onPress={addTask}>
            Add Task
          </Button>
        </Modal>
      </Portal>
      <SearchStack />
      <SegmentedButtonTask />

      {isGettingTasks ? (
        <View
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator animating={true} size={"large"} color="grey" />
        </View>
      ) : (
        <ScheduleList list={taskList} />
      )}

      <AddTaskFAB showModal={showModal} />
    </View>
  );
};

export default home;
