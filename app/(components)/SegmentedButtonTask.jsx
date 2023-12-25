import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

const SegmentedButtonTask = () => {
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
            label: "Main Tasks",
            showSelectedCheck: true,
          },
          {
            value: "finished",
            label: "Finished",
            showSelectedCheck: true,
          },
          { value: "cancel", label: "Canceled", showSelectedCheck: true },
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
