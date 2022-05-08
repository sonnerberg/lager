import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import Stock from "./stock/Stock";
import snes from "../assets/snes.png";
import { Base, Typography } from "../styles/index";
import Product from "../interfaces/Product";

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Home = ({ products, setProducts }: Props) => (
  <View style={Base.base}>
    <Text style={Typography.header1}>Lager-appen</Text>
    <Image source={snes} style={Base.homePageImage} />
    <Stock products={products} setProducts={setProducts} />
    <StatusBar style="auto" />
  </View>
);

export default Home;
