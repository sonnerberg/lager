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
      const flashMessage = await AuthModel.login({
        email: auth.email,
        password: auth.password,
      });

      showMessage(flashMessage);

      if (flashMessage.type === "success") {
        setIsLoggedIn(true);
      }
    } else {
      showMessage({
        message: "Något saknas i formuläret",
        description: "E-post eller lösenord saknas",
        type: "warning",
      });
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
