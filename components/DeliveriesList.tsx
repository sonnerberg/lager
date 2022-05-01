import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import deliveriesModel from "../models/deliveries";
import productsModel from "../models/products";
import { Base, Typography } from "../styles";
import Delivery from "../interfaces/Delivery";

const DeliveriesList = ({ route, navigation, setProducts }) => {
  const { reload } = route.params || false;
  const [deliveries, setDeliveries] = useState([]);
  const fetchAllDeliveries = async () => {
    setDeliveries(await deliveriesModel.getDeliveries());
  };

  const fetchAllProducts = async () => {
    setProducts(await productsModel.getProducts());
  };

  if (reload) {
    console.log("reloading deliveries and products");
    fetchAllDeliveries();
    fetchAllProducts();
    route.params.reload = false;
  }

  useEffect(() => {
    fetchAllDeliveries();
  }, []);

  const listOfDeliveries = deliveries.map((delivery: Partial<Delivery>) => (
    <Text key={delivery.id} style={Typography.padding}>
      <Text style={Typography.boldText}>{delivery.product_name},</Text>
      <Text> levererade: {delivery.amount}</Text>
      <Text> kommentar: {delivery.comment}</Text>
      <Text> datum: {delivery.delivery_date}</Text>
    </Text>
  ));

  return (
    <View style={Base.base}>
      <Text style={Typography.header2}>Inleveranser</Text>
      {listOfDeliveries.length > 0 ? (
        listOfDeliveries
      ) : (
        <Text>Inga inleveranser</Text>
      )}
      <Button
        title="Skapa ny inleverans"
        onPress={() => {
          navigation.navigate("Form");
        }}
      />
    </View>
  );
};

export default DeliveriesList;
