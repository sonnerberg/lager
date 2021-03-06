import { useState } from "react";
import Auth from "../../interfaces/Auth";
import AuthFields from "./AuthFields";
import AuthModel from "../../models/auth";
import { showMessage } from "react-native-flash-message";

interface Props {
  navigation: { navigate: Function };
}

const Register = ({ navigation }: Props) => {
  const [auth, setAuth] = useState<Partial<Auth>>({});

  const doRegister = async () => {
    if (auth.email && auth.password) {
      const flashMessage = await AuthModel.register({
        email: auth.email,
        password: auth.password,
      });
      showMessage(flashMessage);
      if (flashMessage.type === "success") {
        // TODO: Send email and password to "Login"
        navigation.navigate("Login");
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
      submit={doRegister}
      navigation={navigation}
      title="Registera"
    />
  );
};

export default Register;
