import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { Button } from "react-native-paper";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const journalItem = () => {
  const { id, title, description, state } = useLocalSearchParams();

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteJournal = () => {
    setIsDeleting(true);
    deleteDoc(doc(db, "journals", id))
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Journal deleted",
          textBody:
            "Why you deleted a journal that is data that you can improved? The more you do, the more you become happy.",
        });
        console.log("task deleted");
        setIsDeleting(false);
        setTimeout(() => {
          router.back();
        }, 3000);
      })
      .catch((e) => console.log(e));
  };
  return (
    <AlertNotificationRoot>
      <Text>journalItem - {id}</Text>

      <Button loading={isDeleting} onPress={deleteJournal}>
        Delete Plan
      </Button>
    </AlertNotificationRoot>
  );
};

export default journalItem;

const styles = StyleSheet.create({});
