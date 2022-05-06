import { api_key, base_url } from "../config/config.json";
import Order from "../interfaces/Order";
import products from "./products";

const orders = {
  getOrders: async (): Promise<Order[]> => {
    const response = await fetch(`${base_url}/orders?api_key=${api_key}`);
    const result = await response.json();

    return result.data;
  },
  changeOrderToInvoiced: async (order: Partial<Order>) => {
    console.log("the order", order);
    await fetch(`${base_url}/orders`, {
      method: "PUT",
      body: JSON.stringify({
        api_key,
        id: order.id,
        name: order.name,
        status_id: order.status_id,
      }),
      headers: { "content-type": "application/json" },
    });
  },
  getOrder: async (orderId: number): Promise<Order> => {
    const response = await fetch(
      `${base_url}/orders/${orderId}?api_key=${api_key}`
    );
    const result = await response.json();

    return result.data;
  },
  pickOrder: async (order: Partial<Order>) => {
    const { id, name } = order;
    order.order_items?.forEach((item) => {
      products.updateProduct(item);
    });
    await fetch(`${base_url}/orders`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        api_key,
        status_id: 200,
        status: "Packad",
      }),
    });
  },
};

export default orders;
