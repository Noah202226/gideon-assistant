import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator, Avatar, Button, Card } from "react-native-paper";

const JournalList = ({ journals, isGettingJournal }) => {
  console.log(journals);

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  return (
    <View>
      <Text>Journal List</Text>

      {isGettingJournal && (
        <ActivityIndicator animating={isGettingJournal} color={"grey"} />
      )}

      {journals.map((journal) => (
        <Card key={journal?.id} onPress={() => console.log(journal.id)}>
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
      ))}
    </View>
  );
};

export default JournalList;
