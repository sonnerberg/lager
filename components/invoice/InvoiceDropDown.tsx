import { useEffect, useState } from "react";
import productModel from "../../models/products";
import { Picker } from "@react-native-picker/picker";
import Product from "../../interfaces/Product";
import ordersModel from "../../models/orders";
import Order from "../../interfaces/Order";
import Invoice from "../../interfaces/Invoice";

interface Props {
  invoice: Partial<Invoice>;
  setInvoice: React.Dispatch<React.SetStateAction<Partial<Invoice>>>;
  setCurrentOrder: React.Dispatch<React.SetStateAction<Partial<Invoice>>>;
}

const OrderDropDown = ({ invoice, setInvoice, setCurrentOrder }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  let orderHash: any = {};

  const fetchAllOrders = async () => {
    const orders = await ordersModel.getOrders();
    const nonInvoicedOrders = orders.filter((order) => order.status_id !== 600);
    setOrders(nonInvoicedOrders);
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
        setCurrentOrder(orderHash[itemValue]);
      }}
    >
      {itemsList}
    </Picker>
  );
};

export default OrderDropDown;
