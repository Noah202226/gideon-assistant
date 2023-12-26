import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";

import SearchStack from "../(components)/SearchTask";
import SegmentedButtonTask from "../(components)/SegmentedButtonTask";
import ScheduleList from "../(components)/ScheduleList";
import AddTaskFAB from "../(components)/AddTaskFAB";

import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const home = () => {
  const [isGettingTasks, setIsGettingTasks] = React.useState(true);
  const [visible, setVisible] = React.useState(false);

  const [newTaskName, setNewTaskName] = React.useState("");
  const [isAddingTask, setIsAddingTask] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [taskList, setTaskList] = React.useState([]);

  const [list, setList] = React.useState(taskList);

  const filterTask = (filterBy) => {
    const filtered = taskList.filter((item) => item.state === filterBy);
    setList(filtered);
  };
  const showAllTask = () => {
    const filtered = taskList.filter((item) => item.state === "ongoing");
    setList(filtered);
  };

  const addTask = () => {
    setIsAddingTask(true);
    addDoc(collection(db, "tasks"), {
      taskName: newTaskName,
      description: "New Added Task.",
      state: "ongoing",
    })
      .then(() => {
        console.log("task added");
        setIsAddingTask(false);
        setVisible(false);
        setNewTaskName("");
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

  React.useEffect(() => {
    showAllTask();
  }, [taskList]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
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

          <Button
            mode="contained-tonal"
            onPress={addTask}
            loading={isAddingTask}
          >
            Add Task
          </Button>
        </Modal>
      </Portal>

      <SegmentedButtonTask
        originalList={taskList}
        taskList={list}
        filterTask={filterTask}
        showAllTask={showAllTask}
      />

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
        <ScheduleList list={list} />
      )}

      <AddTaskFAB showModal={showModal} />
    </View>
  );
};

export default home;
