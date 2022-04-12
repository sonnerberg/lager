import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { api_key, base_url } from "../config/config.json";
import Product from "../interfaces/Product";
import productsModel from "../models/products";

const StockList = ({ products }) => {
  const productNames = products.map((product: Partial<Product>) => (
    <Text key={product.id}>
      <Text style={{ fontWeight: "bold" }}>{product.name}, </Text>
      <Text>antal i lager: {product.stock}</Text>
    </Text>
  ));

  return <View>{productNames}</View>;
};

const Stock = ({ products }) => {
  return (
    <>
      <Text style={{ color: "#333", fontSize: 24 }}>Lagerforteckning</Text>
      <StockList products={products} />
    </>
  );
};

export default Stock;
