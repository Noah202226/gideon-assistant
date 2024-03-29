import moment from "moment";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: moment()
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date
    });
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate : moment();
    return (
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
          dayShape="square"
          scrollable={true}
          customDatesStyles={this.props.plans}
          minDate={moment()}
          textStyle={{ color: "#61dafb" }}
        />

        <View>
          <Text
            style={{
              fontSize: 16,
              color: "#61dafb",
              textAlign: "right",
              marginRight: 10
            }}
          >
            SELECTED DATE:{moment(startDate).format("MM/DD/YY")}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282c34",
    marginTop: 1
  }
});
