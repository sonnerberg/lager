import { useEffect, useState } from "react";
import productModel from "../../models/products";
import { Picker } from "@react-native-picker/picker";
import Product from "../../interfaces/Product";
import Delivery from "../../interfaces/Delivery";

interface Props {
  delivery: Partial<Delivery>;
  setDelivery: React.Dispatch<React.SetStateAction<Partial<Delivery>>>;
  setCurrentProduct: React.Dispatch<React.SetStateAction<Partial<Product>>>;
}

const ProductDropDown = ({
  delivery,
  setDelivery,
  setCurrentProduct,
}: Props) => {
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
      selectedValue={delivery?.product_id}
      onValueChange={(itemValue) => {
        setDelivery({ ...delivery, product_id: itemValue });
        setCurrentProduct(productsHash[itemValue]);
      }}
    >
      {itemsList}
    </Picker>
  );
};

export default ProductDropDown;
