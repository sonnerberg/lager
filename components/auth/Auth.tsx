import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Register from "./Register";

const Stack = createNativeStackNavigator();

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Auth = ({ setIsLoggedIn }: Props) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login">
        {(screenProps) => (
          <Login
            route={screenProps.route}
            navigation={screenProps.navigation}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default Auth;
