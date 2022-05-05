import { api_key, base_url } from "../config/config.json";
import auth from "./auth";

const invoices = {
  getInvoices: async () => {
    const token = await auth.getToken();
    const response = await fetch(`${base_url}/invoices?api_key=${api_key}`, {
      method: "GET",
      headers: { "content-type": "application/json", "x-access-token": token },
    });
    const { data } = await response.json();

    return data;
  },
};

export default invoices;
