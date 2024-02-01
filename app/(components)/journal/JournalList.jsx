import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Chip
} from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { router } from "expo-router";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const Item = ({ journal }) => (
  <Pressable
    onPress={() => {
      router.push({
        pathname: "/journals/[id]",
        params: { id: journal?.id }
      });
    }}
  >
    <Card key={journal?.id} style={{ marginVertical: 5 }}>
      <Card.Title
        title={journal.journalTitle}
        subtitle={journal?.category}
        left={LeftContent}
        titleStyle={{ fontSize: 16, fontWeight: "bold" }}
      />
      <Card.Content>
        <Text variant="titleLarge">{journal.note}</Text>
        <Text variant="bodyMedium">{journal.motivation}</Text>
      </Card.Content>

      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  </Pressable>
);

const JournalList = ({ journals, isGettingJournal }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "#61dafb",
          margin: 5
        }}
      >
        Journal List ({journals?.length})
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-evenly",
          marginVertical: 10
        }}
      >
        <Chip icon="briefcase" onPress={() => console.log("Pressed")}>
          Work
        </Chip>
        <Chip icon="bag-personal" onPress={() => console.log("Pressed")}>
          Personal
        </Chip>
        <Chip icon="hands-pray" onPress={() => console.log("Pressed")}>
          Spiritual
        </Chip>
      </View>

      {isGettingJournal && (
        <ActivityIndicator animating={isGettingJournal} color={"grey"} />
      )}

      <FlatList
        style={{ marginBottom: 150 }}
        data={journals}
        renderItem={({ item }) => <Item journal={item} id={item.id} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default JournalList;
