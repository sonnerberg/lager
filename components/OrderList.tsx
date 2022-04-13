import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { api_key, base_url } from "../config/config.json";
import Order from "../interfaces/Order";
import orders from "../models/orders";

const OrderList = ({ route, navigation }) => {
  const { reload } = route.params || false;
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    setAllOrders(await orders.getOrders());
  };

  if (reload) {
    fetchAllOrders();
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const listOfOrders = allOrders
    .filter((order: Order) => order.status === "Ny")
    .map((order: Order) => (
      <Button
        title={order.name}
        key={order.id}
        onPress={() => {
          navigation.navigate("Details", {
            order,
          });
        }}
      />
    ));

  return (
    <View>
      <Text>Ordrar redo att plockas</Text>
      {listOfOrders}
    </View>
  );
};

export default OrderList;
