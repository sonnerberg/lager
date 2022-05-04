import { useState } from "react";
import Auth from "../../interfaces/Auth";
import AuthFields from "./AuthFields";
import AuthModel from "../../models/auth";

const Login = ({ route, navigation, setIsLoggedIn }) => {
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
