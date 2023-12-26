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

const TaskItem = () => {
  const { id, title, description, state } = useLocalSearchParams();

  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isCanceling, setIsCanceling] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const deleteTask = (id) => {
    setIsDeleting(true);
    deleteDoc(doc(db, "tasks", id))
      .then(() => {
        console.log("task deleted");
        setIsDeleting(false);
        router.back();
      })
      .catch((e) => console.log(e));
  };

  const updateTask = (id) => {
    setIsUpdating(true);
    setDoc(doc(db, "tasks", id), { state: "finished" }, { merge: true })
      .then(() => {
        console.log("task updated");
        router.back();
        setIsUpdating(false);
      })
      .catch((e) => console.log(e));
  };

  const cancelTask = (id) => {
    setIsCanceling(true);
    setDoc(doc(db, "tasks", id), { state: "canceled" }, { merge: true })
      .then(() => {
        console.log("task canceled");
        router.back();
        setIsCanceling(false);
      })
      .catch((e) => console.log(e));
  };

  const moveToCompletedTask = (idToDelete, data) => {
    addDoc(collection(db, "completedTasks"), data)
      .then(() => {
        console.log("Task saved to completed tasks");
        deleteDoc(doc(db, "tasks", idToDelete))
          .then(() => {
            console.log("and task deleted");
            router.back();
          })
          .catch((e) => console.log(`And error deleting task`, e));
      })
      .catch((e) => console.log(e));
  };
  return (
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
            loading={isCanceling}
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
