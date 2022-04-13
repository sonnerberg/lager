import { View, Text, Button } from "react-native";
import Order from "../interfaces/Order";
import orderModel from "../models/orders.ts";
import Product from "../interfaces/Product";
import OrderItem from "../interfaces/OrderItem";
import { useEffect } from "react";
import productsModel from "../models/products";

const PickList = ({ route, navigation, setProducts }) => {
  const { order } = route.params;

  const checkInventory = () => {
    // TODO: Check the inventory for all products in order
    const enoughOnHand = order.order_items.every(
      (product: Partial<OrderItem>) => product.stock > product.amount
    );
    return enoughOnHand;
  };

  useEffect(async () => {
    setProducts(await productsModel.getProducts());
  }, []);

  const pick = async () => {
    await orderModel.pickOrder(order);
    setProducts(await productsModel.getProducts());
    navigation.navigate("List", { reload: true });
  };

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
      {checkInventory() ? (
        <Button title="Plocka order" onPress={pick} />
      ) : (
        <Text>"This order cannot be fulfilled"</Text>
      )}
    </View>
  );
};

export default PickList;
