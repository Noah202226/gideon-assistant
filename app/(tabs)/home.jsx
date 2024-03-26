import { Image, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Text } from "react-native-elements";

import { AlertNotificationRoot } from "react-native-alert-notification";

import HorizontalCheckboxes from "../(components)/HorizontalCheckbox";

const home = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // Checkboxes states
  const [routines, setRoutines] = useState([
    { id: "1", label: "Pray and seek guidance" },
    { id: "2", label: "Exercise atleast 5mins" },
    { id: "3", label: "Work in your business" },
    {
      id: "4",
      label: "Journal things happen. Give thanks to what we have done."
    }
  ]);
  const [financialStatement, setFinancialStatement] = useState([
    { id: "1", label: "Church Services Needs" },
    { id: "2", label: "Motor(2190/month) + Maintenances" },
    {
      id: "3",
      label: "Meralco/PrimeWater/Converge"
    },
    {
      id: "4",
      label: "Personal Hygiene(Skincare, Healthy Body, Office/Studio"
    },
    { id: "5", label: "Medina(6k)" },
    { id: "6", label: "RJ(1k)" },
    {
      id: "7",
      label: "Papa's and Kaycee's life"
    },
    {
      id: "8",
      label: "Your life, Experience life!"
    }
  ]);
  const [goals, setGoals] = useState([
    { id: "1", label: "Linken Software Solution Profitable" },
    { id: "2", label: "Get Studio or Office" }
  ]);
  const [personalDev, setPersonalDev] = useState([
    { id: "1", label: "Get real friends, socialize." },
    { id: "2", label: "Health, More energy" },
    { id: "3", label: "More money, More things you can do." },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString("en-US", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    minute: "numeric",
    second: "numeric"
  }); // You can customize the format as needed

  return (
    <AlertNotificationRoot>
      <View
        style={{
          flex: 1,
          backgroundColor: "#282c34"
        }}
      >
        {/* Checkboxes for routine */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#282c34",
            padding: 5
          }}
        >
          <Text style={{ fontSize: 26, color: "#61dafb" }}>
            {formattedDateTime}
          </Text>
          <Text style={{ fontSize: 12, color: "#61dafb" }}>
            Time is the most precious asset we all have!
          </Text>
        </View>
        <HorizontalCheckboxes
          title="Your daily improvement routines"
          details={"To have a good habit, good habit leads to good result"}
          data={routines}
          listingStyles={true}
        />
        <HorizontalCheckboxes
          title="Goals"
          details="To make us know what we need to do, and focus to get progress"
          data={goals}
          listingStyles={true}
        />

        <HorizontalCheckboxes
          title="Financial Motivation"
          details="To make us not always think how get we pays all bills."
          data={financialStatement}
        />

        <HorizontalCheckboxes
          title="Personal Development"
          details="To improve yourself, better self == better life"
          data={personalDev}
        />
      </View>
    </AlertNotificationRoot>
  );
};

export default home;
