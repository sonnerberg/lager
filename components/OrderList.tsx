import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { api_key, base_url } from "../config/config.json";

const OrderList = ({ route, navigation }) => {
  const { reload } = route.params || false;
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await fetch(`${base_url}/orders?api_key=${api_key}`);
    const result = await response.json();
    setAllOrders(result.data);
  };

  if (reload) {
    fetchAllOrders();
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const listOfOrders = allOrders
    .filter((order) => order.status === "Ny")
    .map((order) => (
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
