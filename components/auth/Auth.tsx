import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Register from "./Register";

const Stack = createNativeStackNavigator();

const Auth = (props) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login">
        {(screenProps) => (
          <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default Auth;