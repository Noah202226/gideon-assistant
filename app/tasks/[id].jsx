import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, Button, Card, IconButton } from "react-native-paper";

import { db } from "../firebaseConfig";
import {
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
  Toast,
} from "react-native-alert-notification";

const TaskItem = () => {
  const { id, title, description, state } = useLocalSearchParams();

  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isCanceling, setIsCanceling] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isMovingToCompletedTask, setIsMovingToCompletedTask] =
    React.useState(false);

  const deleteTask = (id) => {
    setIsDeleting(true);
    deleteDoc(doc(db, "tasks", id))
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Task deleted",
          textBody:
            "Why you deleted a task? The more you do, the more you become happy.",
        });
        console.log("task deleted");
        setIsDeleting(false);
        setTimeout(() => {
          router.back();
        }, 3000);
      })
      .catch((e) => console.log(e));
  };

  const updateTask = (id) => {
    setIsUpdating(true);
    setDoc(doc(db, "tasks", id), { state: "finished" }, { merge: true })
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Task is finished.",
          textBody:
            "Congrats. You made a progress! Keep doing building your dream.",
          autoClose: 3000,
        });
        console.log("task updated");

        setIsUpdating(false);

        setTimeout(() => {
          router.back();
        }, 3000);
      })
      .catch((e) => console.log(e));
  };

  const cancelTask = (id) => {
    setIsCanceling(true);
    setDoc(doc(db, "tasks", id), { state: "canceled" }, { merge: true })
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Task canceled",
          textBody: "Why you canceled a task? Lazy can't be happy.",
        });
        console.log("task canceled");
        setTimeout(() => {
          router.back();
        }, 3000);
        setIsCanceling(false);
      })
      .catch((e) => console.log(e));
  };

  const moveToCompletedTask = (idToDelete, data) => {
    setIsMovingToCompletedTask(true);
    addDoc(collection(db, "completedTasks"), data)
      .then(() => {
        console.log("Task saved to completed tasks");
        deleteDoc(doc(db, "tasks", idToDelete))
          .then(() => {
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Task saved to completed task",
              textBody:
                "You can monitor it. To see what task you have accomplished.",
            });

            setTimeout(() => {
              router.back();
            }, 3000);

            setIsMovingToCompletedTask(false);
          })
          .catch((e) => console.log(`And error deleting task`, e));
      })
      .catch((e) => console.log(e));
  };
  return (
    <AlertNotificationRoot>
      <View style={{ flex: 1 }}>
        <Card style={styles.container}>
          <Card.Title
            title={title}
            right={(props) => (
              <Button
                loading={isDeleting}
                {...props}
                icon="delete"
                onPress={() => deleteTask(id)}
              />
            )}
          />

          <Card.Content>
            <Text variant="titleLarge">{title}</Text>
            <Text variant="bodyMedium">{description}</Text>
          </Card.Content>
          <Card.Actions>
            {state === "ongoing" ? (
              <>
                <Button loading={isCanceling} onPress={() => cancelTask(id)}>
                  Cancel
                </Button>

                <Button loading={isUpdating} onPress={() => updateTask(id)}>
                  Ok
                </Button>
              </>
            ) : state === "finished" ? (
              <Button
                loading={isMovingToCompletedTask}
                onPress={() =>
                  moveToCompletedTask(id, {
                    taskName: title,
                    description,
                    dateCompleted: serverTimestamp(),
                  })
                }
              >
                Move to Completed Task
              </Button>
            ) : state === "canceled" || state === "finished" ? (
              ""
            ) : (
              <Button loading={isUpdating} onPress={() => updateTask(id)}>
                Ok
              </Button>
            )}
          </Card.Actions>
        </Card>
      </View>
    </AlertNotificationRoot>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "lightgrey",
  },
});
