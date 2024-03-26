import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Calendar from "../(components)/planner/Calendar";
import {
  Button,
  FAB,
  List,
  Modal,
  Portal,
  TextInput
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import moment from "moment";
import { DateTime } from "../(components)/DateTime";
import {
  AlertNotificationRoot,
  Toast,
  ALERT_TYPE
} from "react-native-alert-notification";
import { router } from "expo-router";

const Item = ({ title, description, id, dateAdded }) => (
  <Pressable
    style={{ backgroundColor: "grey", marginVertical: 5 }}
    onPress={() => {
      router.push({
        pathname: "/plans/[id]",
        params: { id }
      });
      console.log(id);
    }}
  >
    <List.Item
      style={{}}
      title={title}
      description={<Text style={{color: 'white'}}>{description}</Text>}
      right={(props) => <List.Icon {...props} icon="folder" />}
    />
    <Text style={{ fontStyle: "italic", textAlign: "right" }}>
      Date Added: {dateAdded}
    </Text>
  </Pressable>
);

const plans = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [plansList, setPlansList] = useState([]);

  // New Plan State
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanDesc, setNewPlanDesc] = useState("");
  const [newPlanDate, setNewPlanDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isAddingPlan, setIsAddingPlan] = useState(false);

  const addPlan = () => {
    setIsAddingPlan(true);
    addDoc(collection(db, "planner"), {
      planName: newPlanName,
      planDesc: newPlanDesc,
      dateAdded: serverTimestamp(),
      date: newPlanDate,
      textStyle: "green"
    })
      .then(() => {
        console.log("Plan added");
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Plan saved.",
          textBody: "New plan added. You can see it to make more improvements.",
          autoClose: 3000
        });
        setIsAddingPlan(false);
        setVisible(false);
        setNewPlanName("");
        setNewPlanDesc("");
        setNewPlanDate("");
      })
      .catch((e) => {
        console.log(e);
        setVisible(false);
      });
  };

  // { date: "2024-01-07", textStyle: { color: "green" } }

  useEffect(() => {
    onSnapshot(collection(db, "planner"), (snapshot) => {
      const data = [];
      snapshot.docs.forEach((doc) => {
        const jsDate = doc.data()?.date?.toDate();
        const dateAddedDate = doc.data()?.dateAdded?.toDate();
        data.push({
          id: doc.id,
          planDesc: doc.data().planDesc,
          // date: "2024-01-07",
          date: moment(jsDate).format("YYYY-MM-DD"),
          textStyle: { color: doc.data().textStyle, fontWeight: "bold" },
          planName: doc.data().planName,
          dateAdded: moment(dateAddedDate).format("YYYY-MM-DD")
        });
      });

      setPlansList(data);
    });
  }, []);
  return (
    <AlertNotificationRoot>
      <View style={{ flex: 1, display: "flex" }}>
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
              value={newPlanName}
              onChangeText={(e) => setNewPlanName(e)}
              placeholder="Plan Name..."
            />

            <TextInput
              mode="outlined"
              value={newPlanDesc}
              onChangeText={(e) => setNewPlanDesc(e)}
              placeholder="Plan Description..."
            />
            <DateTime
              date={newPlanDate}
              setDate={setNewPlanDate}
              mode={mode}
              setMode={setMode}
              show={show}
              setShow={setShow}
            />
            <Button
              mode="contained-tonal"
              onPress={addPlan}
              loading={isAddingPlan}
            >
              Save Plan
            </Button>
          </Modal>
        </Portal>

        <Calendar plans={plansList} />

        <SafeAreaView style={styles.container}>
          <FlatList
            data={plansList}
            renderItem={({ item }) => (
              <Item
                title={item.planName}
                description={`${item.planDesc}`}
                key={item.id}
                dateAdded={item.dateAdded}
                id={item.id}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>

        <FAB
          icon="airplane-plus"
          style={styles.fab}
          onPress={() => setVisible(true)}
        />
      </View>
    </AlertNotificationRoot>
  );
};

export default plans;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});
