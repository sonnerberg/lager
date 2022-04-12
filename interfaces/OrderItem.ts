export default interface OrderItem {
  id: number;
  article_number: string;
  name: string;
  description: string;
  specifiers: object;
  stock: number;
  location: string;
  price: number;
  api_key: string;
}
