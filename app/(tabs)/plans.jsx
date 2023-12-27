import { StyleSheet, Text, View } from "react-native";
import React from "react";

import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
  Toast,
} from "react-native-alert-notification";
import { Button } from "react-native-paper";

const plans = () => {
  return (
    <AlertNotificationRoot>
      <View>
        <Text>plans</Text>

        <View>
          <Button
            title={"dialog box"}
            onPress={() =>
              Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                textBody: "Congrats! this is dialog box success",
                button: "close",
              })
            }
          >
            Confirm
          </Button>

          <Button
            title={"toast notification"}
            onPress={() =>
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Success",
                textBody: "Congrats! this is toast notification success",
              })
            }
          >
            CLick
          </Button>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default plans;

const styles = StyleSheet.create({});
