import { useState } from "react";
import Auth from "../../interfaces/Auth";
import AuthFields from "./AuthFields";
import AuthModel from "../../models/auth";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

interface Props {
  navigation: { navigate: Function };
  setIsLoggedIn: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Login = ({ navigation, setIsLoggedIn }: Props) => {
  const [auth, setAuth] = useState<Partial<Auth>>({});

  const doLogin = async () => {
    if (auth.email && auth.password) {
      const message = await AuthModel.login({
        email: auth.email,
        password: auth.password,
      });

      showMessage({ message, type: "success" });

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
