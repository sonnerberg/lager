import { useEffect, useState } from "react";
import productModel from "../models/products";
import { Picker } from "@react-native-picker/picker";
import Product from "../interfaces/Product";

const ProductDropDown = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  let productsHash: any = {};

  const fetchAllProducts = async () => {
    setProducts(await productModel.getProducts());
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const itemsList = products.map((product: Partial<Product>, index) => {
    productsHash[product.id] = product;
    return <Picker.Item key={index} label={product.name} value={product.id} />;
  });

  return (
    <Picker
      selectedValue={props.delivery?.product_id}
      onValueChange={(itemValue) => {
        props.setDelivery({ ...props.delivery, product_id: itemValue });
        props.setCurrentProduct(productsHash[itemValue]);
      }}
    >
      {itemsList}
    </Picker>
  );
};

export default ProductDropDown;
