import { useEffect, useState } from "react";
import { Text, Button, ScrollView, TextInput } from "react-native";
import { Base, Forms, Typography } from "../../styles";
import Invoice from "../../interfaces/Invoice";
import OrderDropDown from "./InvoiceDropDown";
import ordersModel from "../../models/orders";
import Order from "../../interfaces/Order";

const InvoiceForm = ({ route, navigation }) => {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    creation_date: new Date().toLocaleDateString("se"),
  });
  const [currentInvoice, setCurrentInvoice] = useState<Partial<Invoice>>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const fetchAnOrder = async (order_id): Promise<Partial<Order>> => {
    const order = await ordersModel.getOrder(order_id);
    console.log("the order is", order);
    return order;
  };

  const calculateTotalPrice = (order): number => {
    try {
      let sum = 0;
      order.order_items.forEach((item) => {
        console.log(item);
        sum += item.price;
      });
      return sum;
    } catch (error) {
      console.error("Cannot calculate total price", error);
    }
  };

  console.log(currentInvoice);

  // useEffect(() => {
  //   // TODO: Get totalprice for order
  //   const order = fetchAnOrder(invoice?.order_id);
  //   // const totalPrice = calculateTotalPrice(order);
  //   // console.log("totalprice", totalPrice);
  //   // }, [invoice]);
  // }, [invoice]);

  // console.log(invoice);

  // const addDelivery = async () => {
  //   try {
  //     await deliveryModel.addDelivery(delivery);

  //     const updatedProduct: Partial<Product> = {
  //       ...currentProduct,
  //       stock: (currentProduct.stock || 0) + (delivery.amount || 0),
  //     };

  //     await productModel.addToStock(updatedProduct);

  //     navigation.navigate("ListOfDeliveries", { reload: true });
  //   } catch (error) {
  //     console.error("cannot make delivery", error);
  //   }
  // };

  return (
    <ScrollView style={{ ...Base.base }}>
      <Text style={{ ...Typography.header2 }}>Ny faktura</Text>

      <Text style={{ ...Typography.label }}>Order</Text>
      <OrderDropDown
        invoice={invoice}
        setInvoice={setInvoice}
        setCurrentInvoice={setCurrentInvoice}
      />

      {/* <Text style={{ ...Typography.label }}>Datum</Text>
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

      <Button title="Gör inleverans" onPress={addDelivery} /> */}
    </ScrollView>
  );
};

export default InvoiceForm;
