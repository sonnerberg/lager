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
import OrderList from "./components/OrderList";
import { useState, useEffect } from "react";
import productsModel from "./models/products";
import { Base, Typography } from "./styles/index";
import { base } from "./styles/Base";

const Tab = createBottomTabNavigator();

const Home = ({ products, setProducts }) => {
  return (
    <View style={Base.base}>
      <Text style={Typography.header1}>Lager-appen</Text>
      <Image source={snes} style={Base.homePageImage} />
      <Stock products={products} setProducts={setProducts} />
      <StatusBar style="auto" />
    </View>
  );
};

const routeIcons = {
  Lager: "home",
  Plock: "list",
};

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(await productsModel.getProducts());
    };
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={Base.container}>
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
          <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick setProducts={setProducts} />}
          </Tab.Screen>
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
