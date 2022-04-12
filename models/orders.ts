import { api_key, base_url } from "../config/config.json";

const orders = {
  getOrders: async () => {
    const response = await fetch(`${base_url}/orders?api_key=${api_key}`);
    const result = await response.json();

    return result.data;
  },
  pickOrder: async () => {},
};

export default orders;
