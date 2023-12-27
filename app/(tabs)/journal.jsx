import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import JournalList from "../(components)/journal/JournalList";
import SearchJournal from "../(components)/journal/SearchJournal";
import { DateTime } from "../(components)/DateTime";

import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import AddJournalFAB from "../(components)/journal/AddJournalFAB";
import { Button, Modal, Portal, TextInput } from "react-native-paper";

const journal = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [newJournalTitle, setNewJournalTitle] = useState("");
  const [newJournalMotivation, setNewJournalMotivation] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isAddingJournal, setIsAddingJournal] = useState(false);

  const [journals, setJournals] = useState([]);
  const [isGettingJournal, setIsGettingJournal] = useState(true);

  const addJournal = () => {
    setIsAddingJournal(true);
    addDoc(collection(db, "journals"), {
      journalTitle: newJournalTitle,
      note: newJournalMotivation,
      dateAdded: serverTimestamp(),
      motivation: "Your better life!",
    })
      .then(() => {
        console.log("journal added");
        setIsAddingJournal(false);
        setVisible(false);
        setNewJournalTitle("");
        setNewJournalMotivation("");
      })
      .catch((e) => {
        console.log(e);
        setVisible(false);
      });
  };

  useEffect(() => {
    onSnapshot(collection(db, "journals"), (snapshot) => {
      const data = [];
      snapshot.docs.forEach((doc) =>
        data.push({
          id: doc.id,
          ...doc.data(),
        })
      );

      setJournals(data);

      setIsGettingJournal(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          style={{ flex: 1 }}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>New Task</Text>
          <TextInput
            mode="outlined"
            value={newJournalTitle}
            onChangeText={(e) => setNewJournalTitle(e)}
            placeholder="Journal Title..."
          />

          <TextInput
            mode="outlined"
            value={newJournalMotivation}
            onChangeText={(e) => setNewJournalMotivation(e)}
            placeholder="Note..."
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
            onPress={addJournal}
            loading={isAddingJournal}
          >
            Add Task
          </Button>
        </Modal>
      </Portal>

      <SearchJournal />
      <JournalList journals={journals} isGettingJournal={isGettingJournal} />

      <AddJournalFAB showModal={showModal} />
    </View>
  );
};

export default journal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
