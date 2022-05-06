import { useEffect, useState } from "react";
import { Text, Button, ScrollView, TextInput } from "react-native";
import { Base, Forms, Typography } from "../../styles";
import Invoice from "../../interfaces/Invoice";
import OrderDropDown from "./InvoiceDropDown";
import ordersModel from "../../models/orders";
import Order from "../../interfaces/Order";
import DateSelectorCreationDate from "./DateSelectorCreationDate";
import DateSelectorDueDate from "./DateSelectorDueDate";
import invoicesModel from "../../models/invoices";

const InvoiceForm = ({ route, navigation }) => {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    creation_date: new Date().toLocaleDateString("se"),
  });
  const [currentOrder, setCurrentOrder] = useState<Partial<Invoice>>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const fetchAnOrder = async (order_id: number): Promise<Partial<Order>> => {
    const order = await ordersModel.getOrder(order_id);
    return order;
  };

  const calculateTotalPrice = (order: Partial<Order>) => {
    try {
      let sum = 0;

      if (order.order_items) {
        order.order_items.forEach((item) => {
          sum += parseInt(item.price) * item.amount;
        });
      }
      return sum;
    } catch (error) {
      console.error("Cannot calculate total price", error);
    }
  };

  useEffect(async () => {
    // TODO: Get totalprice for order
    const order = await fetchAnOrder(invoice?.order_id);
    const totalPrice = calculateTotalPrice(order);
    setTotalPrice(totalPrice);
    // }, [invoice]);
  }, [invoice]);

  // console.log(invoice);

  const addInvoice = async () => {
    try {
      const updatedInvoice: Partial<Invoice> = {
        ...invoice,
        total_price: totalPrice,
      };

      const updatedOrder: Partial<Order> = {
        id: currentOrder.id,
        name: currentOrder.name,
        status_id: 600,
      };

      // TODO: Add the invoice
      await invoicesModel.addInvoice(updatedInvoice);

      // TODO: Change order status to "Fakturerad"
      const result = await ordersModel.changeOrderToInvoiced(updatedOrder);
      console.log(result);

      // TODO: navigate to invoices
      navigation.navigate("ListOfInvoices", { reload: true });
    } catch (error) {
      console.error("cannot create invoice", error);
    }
  };

  return (
    <ScrollView style={{ ...Base.base }}>
      <Text style={{ ...Typography.header2 }}>Ny faktura</Text>

      <Text style={{ ...Typography.label }}>Order</Text>
      <OrderDropDown
        invoice={invoice}
        setInvoice={setInvoice}
        setCurrentOrder={setCurrentOrder}
      />

      <Text style={{ ...Typography.label }}>Totalpris:</Text>
      <Text style={{ ...Typography.label }}>{totalPrice}</Text>

      <Text style={{ ...Typography.label }}>Datum fakturan upprättas:</Text>
      <Text style={{ ...Typography.label }}>{invoice.creation_date}</Text>
      <DateSelectorCreationDate invoice={invoice} setInvoice={setInvoice} />

      <Text style={{ ...Typography.label }}>Datum fakturan förfaller:</Text>
      <Text style={{ ...Typography.label }}>{invoice.due_date}</Text>
      <DateSelectorDueDate invoice={invoice} setInvoice={setInvoice} />

      <Button title="Skapa faktura" onPress={addInvoice} />
    </ScrollView>
  );
};

export default InvoiceForm;
