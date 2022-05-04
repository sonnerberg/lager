import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { api_key, base_url } from "../../config/config.json";
import Product from "../../interfaces/Product";
import { Typography } from "../../styles";
import StockList from "./StockList";

const Stock = ({ products, setProducts }) => {
  return (
    <>
      <Text style={Typography.header3}>Lagerforteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </>
  );
};

export default Stock;
