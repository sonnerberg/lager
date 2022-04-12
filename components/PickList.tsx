import { View, Text, Button } from "react-native";
import Order from "../interfaces/Order";
import orderModel from "../models/orders.ts";

const PickList = ({ route, navigation }) => {
  const { order } = route.params;

  async function pick() {
    console.log("the order to pick is", order);
    await orderModel.pickOrder(order);
    navigation.navigate("List");
  }

  const orderItemsList = order.order_items.map((item, index) => {
    return (
      <Text key={index}>
        {item.name} - {item.amount} - {item.location}
      </Text>
    );
  });

  return (
    <View>
      <Text>{order.name}</Text>
      <Text>{order.address}</Text>
      <Text>
        {order.zip} {order.city}
      </Text>

      <Text>Produkter:</Text>

      {orderItemsList}

      {/*
      TODO: Only allow picking of an order if there are enough products in
      the inventory
      */}
      <Button title="Plocka order" onPress={pick} />
    </View>
  );
};

export default PickList;
