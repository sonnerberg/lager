import { useState } from "react";
import Auth from "../../interfaces/Auth";
import AuthFields from "./AuthFields";
import AuthModel from "../../models/auth";

interface Props {
  navigation: { navigate: Function };
}

const Register = ({ navigation }: Props) => {
  const [auth, setAuth] = useState<Partial<Auth>>({});

  const doRegister = async () => {
    if (auth.email && auth.password) {
      const result = await AuthModel.register({
        email: auth.email,
        password: auth.password,
      });
      // TODO: Show message to user if successful / unsuccessful
      navigation.navigate("Login");
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
