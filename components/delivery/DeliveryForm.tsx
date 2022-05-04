import { useState } from "react";
import { Text, Button, ScrollView, TextInput } from "react-native";
import Delivery from "../../interfaces/Delivery";
import deliveryModel from "../../models/deliveries";
import productModel from "../../models/products";
import { Base, Forms, Typography } from "../../styles";
import Product from "../../interfaces/Product";
import ProductDropDown from "./ProductDropDown";
import DateDropDown from "./DateDropDown";

const DeliveryForm = ({ route, navigation }) => {
  const [delivery, setDelivery] = useState<Partial<Delivery>>({
    delivery_date: new Date().toLocaleDateString("se"),
  });
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  const addDelivery = async () => {
    try {
      await deliveryModel.addDelivery(delivery);

      const updatedProduct: Partial<Product> = {
        ...currentProduct,
        stock: (currentProduct.stock || 0) + (delivery.amount || 0),
      };

      await productModel.addToStock(updatedProduct);

      navigation.navigate("ListOfDeliveries", { reload: true });
    } catch (error) {
      console.error("cannot make delivery", error);
    }
  };

  return (
    <ScrollView style={{ ...Base.base }}>
      <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

      <Text style={{ ...Typography.label }}>Produkt</Text>
      <ProductDropDown
        delivery={delivery}
        setDelivery={setDelivery}
        setCurrentProduct={setCurrentProduct}
      />

      <Text style={{ ...Typography.label }}>Datum</Text>
      <Text style={{ ...Typography.label }}>{delivery.delivery_date}</Text>
      <DateDropDown delivery={delivery} setDelivery={setDelivery} />

      <Text style={{ ...Typography.label }}>Antal</Text>
      <TextInput
        style={{ ...Forms.input }}
        onChangeText={(content: string) => {
          setDelivery({ ...delivery, amount: parseInt(content) });
        }}
        value={delivery?.amount?.toString()}
        keyboardType="phone-pad"
      />

      <Text style={{ ...Typography.label }}>Kommentar</Text>
      <TextInput
        style={{ ...Forms.input }}
        onChangeText={(content: string) => {
          setDelivery({ ...delivery, comment: content });
        }}
        value={delivery?.comment}
      />

      <Button title="Gör inleverans" onPress={addDelivery} />
    </ScrollView>
  );
};

export default DeliveryForm;
