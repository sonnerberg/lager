import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Product from "../../interfaces/Product";

import ShipOrder from "./ShipOrder";
import ShipOrderList from "./ShipOrderList";

const Stack = createNativeStackNavigator();

const Ship = () => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="ShipOrderList" component={ShipOrderList} />
      <Stack.Screen name="Map">
        {({ route, navigation }) => <ShipOrder route={route} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Ship;
