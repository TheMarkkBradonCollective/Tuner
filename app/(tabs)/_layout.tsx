import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/theme";

const icons = {
  index: "compass-outline",
  rooms: "radio-outline",
  activity: "people-outline",
  create: "add-circle-outline",
  profile: "person-circle-outline",
} as const;

export default function TabLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border, height: 66, paddingTop: 8, paddingBottom: 8 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: "700" },
      tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name as keyof typeof icons] ?? "ellipse-outline"} color={color} size={size} />
    })}>
      <Tabs.Screen name="index" options={{ title: "Discover" }} />
      <Tabs.Screen name="rooms" options={{ title: "Rooms" }} />
      <Tabs.Screen name="activity" options={{ title: "Friends" }} />
      <Tabs.Screen name="create" options={{ title: "Create" }} />
      <Tabs.Screen name="profile" options={{ title: "You" }} />
    </Tabs>
  );
}
