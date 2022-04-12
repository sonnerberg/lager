import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import warehouse from "./assets/warehouse.jpg";
import Stock from "./components/Stock";
import snes from "./assets/snes.png";
import Pick from "./components/Pick";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Home = () => (
  <View style={styles.base}>
    <Text style={{ color: "#33c", fontSize: 42 }}>Lager-appen</Text>
    <Image source={snes} style={{ width: "100%", height: "12%" }} />
    <Stock />
    <StatusBar style="auto" />
  </View>
);

const routeIcons = {
  Lager: "home",
  Plock: "list",
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Lager" component={Home} />
          <Tab.Screen name="Plock" component={Pick} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: "#fff",
    paddingStart: 12,
    paddingEnd: 12,
  },
});
