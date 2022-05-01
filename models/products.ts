import { api_key, base_url } from "../config/config.json";
import OrderItem from "../interfaces/OrderItem";
import Product from "../interfaces/Product";

const products = {
  getProducts: async () => {
    const response = await fetch(`${base_url}/products?api_key=${api_key}`);
    const result = await response.json();

    return result.data;
  },
  addToStock: async (product: Partial<Product>) => {
    let result;
    try {
      const { id, name, stock } = product;
      result = await fetch(`${base_url}/products`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          api_key,
          stock,
        }),
      });
    } catch (error) {
      console.error("the error for adding to stock is", error);
    }
  },
  updateProduct: async (product: Partial<OrderItem>) => {
    let result;
    try {
      const { product_id: id, name, stock, amount } = product;
      result = await fetch(`${base_url}/products`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          api_key,
          stock: amount ? stock! - amount : stock,
        }),
      });
    } catch (error) {
      console.error("the error for updating product is", error);
    }
  },
};

export default products;
