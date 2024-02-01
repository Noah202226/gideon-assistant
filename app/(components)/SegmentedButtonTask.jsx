import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

const SegmentedButtonTask = ({
  originalList,
  taskList,
  filterTask,
  showAllTask
}) => {
  const [value, setValue] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        showSelectedCheck={true}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "main",
            label: `Main (${
              originalList.filter((task) => task.state == "ongoing").length
            })`,
            labelStyle: { color: "white", fontSize: 16 },
            showSelectedCheck: true,
            onPress: () => showAllTask()
          },
          {
            value: "finished",
            label: `Done (${
              originalList.filter((task) => task.state == "finished").length
            })`,
            labelStyle: { color: "white", fontSize: 16 },
            showSelectedCheck: true,
            onPress: () => filterTask("finished")
          },
          {
            value: "cancel",
            label: `Canceled (${
              originalList.filter((task) => task.state == "canceled").length
            })`,
            labelStyle: { color: "white", fontSize: 16 },
            showSelectedCheck: true,
            onPress: () => filterTask("canceled")
          }
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10
  }
});

export default SegmentedButtonTask;
