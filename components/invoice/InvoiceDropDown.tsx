import { useEffect, useState } from "react";
import productModel from "../../models/products";
import { Picker } from "@react-native-picker/picker";
import Product from "../../interfaces/Product";
import ordersModel from "../../models/orders";
import Order from "../../interfaces/Order";

const OrderDropDown = ({ invoice, setInvoice, setCurrentInvoice }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  let orderHash: any = {};

  const fetchAllOrders = async () => {
    setOrders(await ordersModel.getOrders());
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const itemsList = orders.map((order: Partial<Order>) => {
    orderHash[order.id] = order;
    return <Picker.Item key={order.id} label={order.name} value={order.id} />;
  });

  return (
    <Picker
      selectedValue={invoice?.order_id}
      onValueChange={(itemValue) => {
        setInvoice({ ...invoice, order_id: itemValue });
        setCurrentInvoice(orderHash[itemValue]);
      }}
    >
      {itemsList}
    </Picker>
  );
};

export default OrderDropDown;
