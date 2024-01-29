import { useState } from "react";
import { View, Text } from "react-native";
import { CheckBox } from "react-native-elements";

const CheckboxExample = ({ label, onToggle }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!checked);
    onToggle && onToggle(!checked);
  };

  return (
    <CheckBox
      title={label}
      checked={checked}
      onPress={handleCheckboxToggle}
      containerStyle={{
        backgroundColor: "transparent",
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 8 // Adjust the margin between checkboxes
      }}
      textStyle={{
        fontSize: 16,
        color: "#333" // Adjust the text color
      }}
      checkedIcon="check-square-o"
      uncheckedIcon="square-o"
      checkedColor="#4CAF50" // Adjust the color when checkbox is checked
      uncheckedColor="#757575" // Adjust the color when checkbox is unchecked
    />
  );
};

export default CheckboxExample;
