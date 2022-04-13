import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import Stock from "./Stock";
import snes from "../assets/snes.png";
import { Base, Typography } from "../styles/index";

const Home = ({ products, setProducts }) => (
  <View style={Base.base}>
    <Text style={Typography.header1}>Lager-appen</Text>
    <Image source={snes} style={Base.homePageImage} />
    <Stock products={products} setProducts={setProducts} />
    <StatusBar style="auto" />
  </View>
);

export default Home;
