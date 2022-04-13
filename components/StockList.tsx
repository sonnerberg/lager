import { useEffect } from "react";
import { Text, View } from "react-native";
import Product from "../interfaces/Product";
import productsModel from "../models/products";
import { Typography } from "../styles";

const StockList = ({ products, setProducts }) => {
  useEffect(async () => {
    setProducts(await productsModel.getProducts());
  }, []);

  const productNames = products.map((product: Partial<Product>) => (
    <Text key={product.id} style={Typography.padding}>
      <Text style={Typography.boldText}>{product.name}, </Text>
      <Text>antal i lager: {product.stock}</Text>
    </Text>
  ));

  return <View>{productNames}</View>;
};

export default StockList;
