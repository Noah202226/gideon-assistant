import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const DateTime = ({ date, setDate, mode, setMode, show, setShow }) => {
  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "lightgrey",
        marginVertical: 10
      }}
    >
      <Text style={{ marginVertical: 5, fontWeight: "bold" }}>
        Set Deadline for this task.
      </Text>
      <Button
        style={{ width: "60%", margin: 5 }}
        mode="contained"
        textColor="white"
        onPress={showDatepicker}
        title="Show date picker!"
      >
        Select Date...
      </Button>

      <Button
        style={{ width: "60%", margin: 5 }}
        mode="contained"
        textColor="white"
        onPress={showTimepicker}
        title="Show time picker!"
      >
        Select Time...
      </Button>
      <Text style={{ marginVertical: 5, fontWeight: "bold" }}>
        Selected: {date?.toLocaleString()}
      </Text>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};
