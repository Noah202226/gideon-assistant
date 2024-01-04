import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "react-native-paper";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  Toast,
  AlertNotificationRoot,
  ALERT_TYPE,
} from "react-native-alert-notification";

const plansItem = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePlan = () => {
    setIsDeleting(true);
    deleteDoc(doc(db, "planner", id))
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
  const { id, title, description, state } = useLocalSearchParams();
  return (
    <AlertNotificationRoot>
      <Text>plansItem - {id}</Text>

      <Button loading={isDeleting} onPress={deletePlan}>
        Delete Plan
      </Button>
    </AlertNotificationRoot>
  );
};

export default plansItem;

const styles = StyleSheet.create({});
