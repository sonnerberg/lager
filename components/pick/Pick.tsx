import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Product from "../../interfaces/Product";

import OrderList from "./OrderList";
import PickList from "./PickList";

const Stack = createNativeStackNavigator();

interface Props {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Pick = ({ setProducts }: Props) => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={OrderList} />
      <Stack.Screen name="Details">
        {({ route, navigation }) => (
          <PickList
            route={route}
            navigation={navigation}
            setProducts={setProducts}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Pick;
