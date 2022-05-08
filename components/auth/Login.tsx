import { useState } from "react";
import Auth from "../../interfaces/Auth";
import AuthFields from "./AuthFields";
import AuthModel from "../../models/auth";
import { ParamListBase, RouteProp } from "@react-navigation/native";

interface Props {
  // route: {
  //   key: string;
  //   name: string;
  //   params: { reload: Boolean };
  // };
  route: RouteProp<ParamListBase, "Login">;
  navigation: { navigate: Function };
  setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Login = ({ route, navigation, setIsLoggedIn }: Props) => {
  const [auth, setAuth] = useState<Partial<Auth>>({});

  const doLogin = async () => {
    if (auth.email && auth.password) {
      await AuthModel.login({
        email: auth.email,
        password: auth.password,
      });

      // TODO: Show message to user if successful / unsuccessful
      setIsLoggedIn(true);
    }
  };
  return (
    <AuthFields
      auth={auth}
      setAuth={setAuth}
      submit={doLogin}
      navigation={navigation}
      title="Logga in"
    />
  );
};

export default Login;
