import OrderItem from "./OrderItem";

interface Order {
  id: number;
  name: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  status: "Ny" | "Packad" | "Skickad" | "Fakturerad" | "Retur" | "Återbetald";
  status_id: 100 | 200 | 400 | 600 | 800 | 900;
  order_items: Array<OrderItem>;
}

export default Order;
