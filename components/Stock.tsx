import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { api_key, base_url } from "../config/config.json";

const StockList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${base_url}/products?api_key=${api_key}`)
      .then((response) => response.json())
      .then((result) => setProducts(result.data));
  }, []);

  const productNames = products.map((product) => (
    <Text key={product.id}>{product.name}</Text>
  ));

  return <View>{productNames}</View>;
};

const Stock = () => {
  return (
    <>
      <Text style={{ color: "#333", fontSize: 24 }}>Lagerforteckning</Text>
      <StockList />
    </>
  );
};

export default Stock;
