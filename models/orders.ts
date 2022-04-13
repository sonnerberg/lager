import { api_key, base_url } from "../config/config.json";
import Order from "../interfaces/Order";
import OrderItem from "../interfaces/OrderItem";
import products from "./products";

const orders = {
  getOrders: async () => {
    const response = await fetch(`${base_url}/orders?api_key=${api_key}`);
    const result = await response.json();

    return result.data;
  },
  pickOrder: async (order: Partial<Order>) => {
    const { id, name } = order;
    // TODO: Reduce the stock for each item ordered
    order.order_items?.forEach((item) => {
      products.updateProduct(item);
    });
    // TODO: Change status_id of order
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

    // const result = await response.json();
    // console.log("the result is", result);
  },
};

export default orders;
