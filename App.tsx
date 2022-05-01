import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import warehouse from "./assets/warehouse.jpg";
import Pick from "./components/Pick";
import { Ionicons } from "@expo/vector-icons";
import OrderList from "./components/OrderList";
import { useState, useEffect } from "react";
import productsModel from "./models/products";
import { Base } from "./styles/index";
import Home from "./components/Home";
import Deliveries from "./components/Deliveries";

const Tab = createBottomTabNavigator();

const routeIcons = {
  Lager: "home",
  Plock: "list",
};

export default function App() {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    setProducts(await productsModel.getProducts());
  };

  useEffect(() => {
    fetchAllProducts();
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
          <Tab.Screen name="Inleveranser">
            {() => <Deliveries setProducts={setProducts} />}
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
