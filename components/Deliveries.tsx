import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeliveriesList from "./DeliveriesList";
import DeliveryForm from "./DeliveryForm";

const Stack = createNativeStackNavigator();

const Deliveries = ({ setProducts }) => {
  return (
    <Stack.Navigator initialRouteName="list">
      <Stack.Screen name="ListOfDeliveries">
        {({ route, navigation }) => (
          <DeliveriesList
            route={route}
            navigation={navigation}
            setProducts={setProducts}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Form" component={DeliveryForm} />
    </Stack.Navigator>
  );
};

export default Deliveries;
