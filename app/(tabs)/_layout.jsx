import { Tabs } from "expo-router";
import FA from "@expo/vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text, View } from "react-native";

export default () => {
  const CustomTabBarIcon = ({ icon, badgeCount }) => {
    return (
      <View>
        <Ionicons name={icon} size={30} />
        {badgeCount > 0 && (
          <View
            style={{
              position: "absolute",
              top: -5,
              right: -5,
              backgroundColor: "red",
              borderRadius: 10,
              padding: 5
            }}
          >
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarActiveBackgroundColor: "grey",
        tabBarStyle: { backgroundColor: "cyan" },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          // You can customize the badgeCount based on your requirements
          const badgeCount = route.name === "home" ? 3 : 0;

          return <CustomTabBarIcon icon={iconName} badgeCount={badgeCount} />;
        }
      })}
    >
      <Tabs.Screen
        name="home"
        options={({ navigation, route }) => ({
          title: "GOALS AND VISION",
          // tabBarIcon: ({ color, size }) => (
          //   <FA name="list" color={color} size={size} />
          // ),

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
        name="schedules"
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
