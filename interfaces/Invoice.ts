interface Invoice {
  address: string;
  city: string;
  country: string;
  creation_date: string | null;
  due_date: string | null;
  id: number;
  name: string;
  order_id: number;
  total_price: number;
  zip: string;
}

export default Invoice;
