import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { api_key, base_url } from "../config/config.json";
import Product from "../interfaces/Product";
import StockList from "./StockList";

const Stock = ({ products, setProducts }) => {
  return (
    <>
      <Text style={{ color: "#333", fontSize: 24 }}>Lagerforteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </>
  );
};

export default Stock;
