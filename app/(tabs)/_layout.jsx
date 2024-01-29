import { Tabs } from "expo-router";
import FA from "@expo/vector-icons/FontAwesome5";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarActiveBackgroundColor: "grey",
        tabBarStyle: { backgroundColor: "cyan" }
      }}
    >
      <Tabs.Screen
        name="home"
        options={({ navigation }) => ({
          title: "SCHEDULES",
          tabBarIcon: ({ color, size }) => (
            <FA name="list" color={color} size={size} />
          ),
          headerRight: ({ color, size }) => (
            <FA
              name="user-cog"
              color={color}
              size={size}
              onPress={() => navigation.navigate("settings")}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 16 // Adjust the padding as needed
          }
        })}
      />
      <Tabs.Screen
        name="plans"
        options={{
          title: "PLANNER",
          tabBarIcon: ({ color, size }) => (
            <FA name="calendar-alt" color={color} size={size} />
          ),
          headerRight: ({ color, size }) => (
            <FA name="list" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "JOURNAL",
          tabBarIcon: ({ color, size }) => (
            <FA name="book" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
};
