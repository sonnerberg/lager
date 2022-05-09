import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Pick from "./components/pick/Pick";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import productsModel from "./models/products";
import authModel from "./models/auth";
import { Base } from "./styles/index";
import Home from "./components/Home";
import Deliveries from "./components/delivery/Deliveries";
import Auth from "./components/auth/Auth";
import { Button } from "react-native-paper";
import Invoices from "./components/invoice/Invoices";
import Product from "./interfaces/Product";
import Ship from "./components/ship/Ship";
import FlashMessage from "react-native-flash-message";

const Tab = createBottomTabNavigator();

const routeIcons = {
  Lager: "home",
  Plock: "list",
  Inleveranser: "car",
  "Logga in": "person-circle",
  Faktura: "document-text",
  "Skicka order": "map-sharp",
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchAllProducts = async () => {
    setProducts(await productsModel.getProducts());
  };

  const loginUser = async () => {
    setIsLoggedIn(await authModel.loggedIn());
  };

  const logoutUser = async () => {
    await authModel.logout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    fetchAllProducts();
    loginUser();
  }, []);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        {isLoggedIn && (
          <Button
            onPress={() => {
              logoutUser();
            }}
          >
            Logga ut
          </Button>
        )}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "cornflowerblue",
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
          {isLoggedIn ? (
            <Tab.Screen name="Faktura" component={Invoices} />
          ) : (
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          )}
          <Tab.Screen name="Skicka order" component={Ship} />
        </Tab.Navigator>
      </NavigationContainer>
      <FlashMessage position={"top"} />
    </SafeAreaView>
  );
}
