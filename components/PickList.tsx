import { View, Text, Button } from "react-native";
import orderModel from "../models/orders";
import OrderItem from "../interfaces/OrderItem";
import { useEffect } from "react";
import products from "../models/products";

const PickList = ({ route, navigation, setProducts }) => {
  const { order } = route.params;

  const checkInventory = () => {
    const enoughOnHand = order.order_items.every(
      (product: Partial<OrderItem>) => product.stock! > product.amount!
    );
    return enoughOnHand;
  };

  const fetchAllProducts = async () => {
    setProducts(await products.getProducts());
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const pick = async () => {
    await orderModel.pickOrder(order);
    fetchAllProducts();
    navigation.navigate("List", { reload: true });
  };

  const orderItemsList = order.order_items.map(
    (item: OrderItem, index: number) => {
      return (
        <Text key={index}>
          {item.name} - {item.amount} - {item.location}
        </Text>
      );
    }
  );

  return (
    <View>
      <Text>{order.name}</Text>
      <Text>{order.address}</Text>
      <Text>
        {order.zip} {order.city}
      </Text>

      <Text>Produkter:</Text>

      {orderItemsList}

      {checkInventory() ? (
        <Button title="Plocka order" onPress={pick} />
      ) : (
        <Text>"This order cannot be fulfilled"</Text>
      )}
    </View>
  );
};

export default PickList;
