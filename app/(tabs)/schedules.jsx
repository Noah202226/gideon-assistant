import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
  Toast
} from "react-native-alert-notification";

import SegmentedButtonTask from "../(components)/SegmentedButtonTask";
import ScheduleList from "../(components)/ScheduleList";
import AddTaskFAB from "../(components)/AddTaskFAB";

import { DateTime } from "../(components)/DateTime";

import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  Text,
  TextInput
} from "react-native-paper";

const schedules = () => {
  const [isGettingTasks, setIsGettingTasks] = useState(true);
  const [visible, setVisible] = useState(false);

  //state for new task
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDetail, setnewTaskDetail] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [taskList, setTaskList] = useState([]);

  const [list, setList] = useState(taskList);

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
      description: newTaskDetail,
      state: "ongoing",
      dateAdded: serverTimestamp(),
      deadLine: date
    })
      .then(() => {
        console.log("task added");
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Task saved.",
          textBody: "New task added. Start doing it now.",
          autoClose: 2000,
          textBodyStyle: {
            color: "cyan"
          }
        });
        setIsAddingTask(false);
        setVisible(false);
        setNewTaskName("");
        setnewTaskDetail("");
      })
      .catch((e) => {
        console.log(e);
        setVisible(false);
      });
  };
  useEffect(() => {
    onSnapshot(collection(db, "tasks"), (snapshot) => {
      const data = [];
      snapshot.docs.forEach((doc) =>
        data.push({
          id: doc.id,
          ...doc.data()
        })
      );

      setTaskList(data);

      setIsGettingTasks(false);
    });
  }, []);

  useEffect(() => {
    showAllTask();
  }, [taskList]);

  //   Date time display
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString("en-US", {
    weekday: "long",
    year: "2-digit",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "numeric",
    second: "numeric"
  }); // You can customize the format as needed
  return (
    <AlertNotificationRoot>
      <View style={{ flex: 1, backgroundColor: "#282c34" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#282c34"
          }}
        >
          <Text style={{ fontSize: 21, color: "#61dafb" }}>
            {formattedDateTime}
          </Text>
          <Text style={{ fontSize: 16, color: "#61dafb" }}>
            Time is the most precious asset we all have!
          </Text>
        </View>
        <Text
          style={{
            fontSize: 26,
            color: "#61dafb",
            textAlign: "center",
            marginVertical: 10
          }}
        >
          Schedules for today
        </Text>

        {/* Add new sched modal */}
        <Portal>
          <Modal
            style={{ flex: 1, margin: 10 }}
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>New Task</Text>
            <TextInput
              mode="outlined"
              value={newTaskName}
              onChangeText={(e) => setNewTaskName(e)}
              placeholder="Task Name..."
            />

            <TextInput
              mode="outlined"
              value={newTaskDetail}
              onChangeText={(e) => setnewTaskDetail(e)}
              placeholder="Details..."
            />
            <DateTime
              date={date}
              setDate={setDate}
              mode={mode}
              setMode={setMode}
              show={show}
              setShow={setShow}
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
              justifyContent: "center"
            }}
          >
            <ActivityIndicator animating={true} size={"large"} color="grey" />
          </View>
        ) : (
          <ScheduleList list={list} />
        )}

        <AddTaskFAB showModal={showModal} />
      </View>
    </AlertNotificationRoot>
  );
};

export default schedules;

const styles = StyleSheet.create({});
