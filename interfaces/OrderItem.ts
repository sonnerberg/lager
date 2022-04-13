export default interface OrderItem {
  order_id: string;
  product_id: string;
  amount: number;
  api_key: string;
  stock: number;
  article_number: string;
  description: string;
  location: string;
  name: string;
  price: string;
  specifiers: object;
}
