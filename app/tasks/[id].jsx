import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, Button, Card, IconButton } from "react-native-paper";

import { db } from "../firebaseConfig";
import { doc, deleteDoc, setDoc } from "firebase/firestore";

const TaskItem = () => {
  const { id, title, description } = useLocalSearchParams();

  const [isDeleting, setIsDeleting] = React.useState(false);

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
    setDoc(doc(db, "tasks", id), { state: "finished" }, { merge: true })
      .then(() => {
        console.log("task updated");
        router.back();
      })
      .catch((e) => console.log(e));
  };

  const cancelTask = (id) => {
    setDoc(doc(db, "tasks", id), { state: "canceled" }, { merge: true })
      .then(() => {
        console.log("task canceled");
        router.back();
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
        <Button onPress={() => cancelTask(id)}>Cancel</Button>
        <Button onPress={() => updateTask(id)}>Ok</Button>
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
