import { api_key, base_url } from "../config/config.json";
import Invoice from "../interfaces/Invoice";
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
  addInvoice: async (invoice: Partial<Invoice>) => {
    const token = await auth.getToken();
    await fetch(`${base_url}/invoices`, {
      method: "POST",
      body: JSON.stringify({
        api_key,
        order_id: invoice.order_id,
        total_price: invoice.total_price,
        creation_date: invoice.creation_date,
        due_date: invoice.due_date,
      }),
      headers: { "content-type": "application/json", "x-access-token": token },
    });
  },
};

export default invoices;
