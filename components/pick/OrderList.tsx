import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import Order from "../../interfaces/Order";
import orders from "../../models/orders";

interface Props {
  route: {
    key: string;
    name: string;
    params: { reload: Boolean };
  };
  navigation: { navigate: Function };
}

const OrderList = ({ route, navigation: { navigate } }: Props) => {
  const { reload } = route.params || false;
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  const fetchAllOrders = async () => {
    setAllOrders(await orders.getOrders());
  };

  if (reload) {
    console.log("reloading orders");
    fetchAllOrders();
    route.params.reload = false;
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const listOfOrders = allOrders
    .filter((order: Order) => order.status_id === 100)
    .map((order: Order) => (
      <Button
        title={order.name}
        key={order.id}
        onPress={() => {
          navigate("Details", {
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
