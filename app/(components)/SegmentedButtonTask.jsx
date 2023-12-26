import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

const SegmentedButtonTask = ({ taskList, filterTask }) => {
  const [value, setValue] = React.useState("");

  const [allTask, setAllTask] = React.useState([]);
  const [filteredTask, setFilteredTask] = React.useState([]);

  React.useEffect(() => {
    setAllTask(taskList);
  }, [taskList]);

  React.useEffect(() => {
    setFilteredTask(allTask);
  }, [filteredTask]);
  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        showSelectedCheck={true}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "main",
            label: `Main (${filteredTask.length})`,
            showSelectedCheck: true,
            onPress: () => {
              setFilteredTask(taskList.filter((task) => task));
            },
          },
          {
            value: "finished",
            label: `Done (${
              filteredTask.filter((task) => task.state == "finished").length
            })`,
            showSelectedCheck: true,
            onPress: () => filterTask("finished"),
          },
          {
            value: "cancel",
            label: `Canceled (${
              filteredTask.filter((task) => task.state == "canceled").length
            })`,
            showSelectedCheck: true,
            onPress: () => {
              setFilteredTask(taskList.filter((task) => task == "canceled"));
            },
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
});

export default SegmentedButtonTask;
