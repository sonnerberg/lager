import { api_key, base_url } from "../config/config.json";
import OrderItem from "../interfaces/OrderItem";
import Delivery from "../interfaces/Delivery";

const deliveries = {
  getDeliveries: async () => {
    const response = await fetch(`${base_url}/deliveries?api_key=${api_key}`);
    const result = await response.json();

    return result.data;
  },
  addDelivery: async (delivery: Partial<Delivery>) => {
    const deliveryWithApiKey = {
      ...delivery,
      api_key,
    };
    const response = await fetch(`${base_url}/deliveries`, {
      body: JSON.stringify(deliveryWithApiKey),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    const result = await response.json();

    return result.data;
  },
  // updateProduct: async (product: Partial<OrderItem>) => {
  //   const { product_id: id, name, stock, amount } = product;
  //   await fetch(`${base_url}/products`, {
  //     method: "PUT",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id,
  //       name,
  //       api_key,
  //       stock: stock! - amount!,
  //     }),
  //   });
  // },
};

export default deliveries;
