import { api_key, base_url } from "../config/config.json";

const products = {
  getProducts: async () => {
    const response = await fetch(`${base_url}/products?api_key=${api_key}`);
    const result = await response.json();

    return result.data;
  },
};

export default products;
