import React, { useState } from "react";
import { SafeAreaView, FlatList, Text } from "react-native";
import CheckboxItem from "../(components)/Checkbox";

const HorizontalCheckboxList = ({ title, data, listingStyles }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggleCheckbox = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };

  const checkedCount = selectedItems.filter(Boolean).length;
  const totalItems = data.length;

  const renderItem = ({ item, index }) => (
    <CheckboxItem
      label={item.label}
      onToggle={() => handleToggleCheckbox(index)}
    />
  );

  return (
    <SafeAreaView
      style={{
        padding: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        margin: 8,
        height: listingStyles === true ? 123 : 200
      }}
    >
      {title && (
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          {title} ({checkedCount}/{totalItems})
        </Text>
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={listingStyles === true ? true : false}
      />
    </SafeAreaView>
  );
};

export default HorizontalCheckboxList;
