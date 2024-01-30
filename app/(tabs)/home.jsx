import { Image, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, Stack } from "expo-router";

import * as SMS from "expo-sms";

import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
  Toast
} from "react-native-alert-notification";

import SegmentedButtonTask from "../(components)/SegmentedButtonTask";
import ScheduleList from "../(components)/ScheduleList";
import AddTaskFAB from "../(components)/AddTaskFAB";
import HorizontalCheckboxes from "../(components)/HorizontalCheckbox";

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

const home = () => {
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
      deadlLine: date
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

  // Checkboxes states
  const [routines, setRoutines] = useState([
    { id: "1", label: "Pray and seek guidance" },
    { id: "2", label: "Exercise atleast 5mins" },
    { id: "3", label: "Work in your business" },
    {
      id: "4",
      label: "Journal things happen. Give thanks to what we have done."
    }
  ]);
  const [financialStatement, setFinancialStatement] = useState([
    { id: "1", label: "Church Services Needs" },
    { id: "2", label: "Motor(2190/month) + Maintenances" },
    {
      id: "3",
      label: "Meralco/PrimeWater/Converge"
    },
    {
      id: "4",
      label: "Personal Hygiene(Skincare, Healthy Body, Office/Studio"
    },
    { id: "5", label: "Medina(6k)" },
    { id: "6", label: "RJ(1k)" },
    {
      id: "7",
      label: "Papa's and Kaycee's life"
    },
    {
      id: "8",
      label: "Your life, Experience life!"
    }
  ]);

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

  return (
    <AlertNotificationRoot>
      <View style={{ flex: 1, backgroundColor: "#d0d0d0" }}>
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

        {/* Checkboxes for routine */}
        <HorizontalCheckboxes
          title="Your daily improvement routines"
          data={routines}
          listingStyles={true}
        />

        <HorizontalCheckboxes
          title="Financial Motivation"
          data={financialStatement}
        />

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

export default home;
