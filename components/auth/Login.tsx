import { useState } from "react";
import Auth from "../../interfaces/Auth";
import AuthFields from "./AuthFields";
import AuthModel from "../../models/auth";

const Login = ({ route, navigation, setIsLoggedIn }) => {
  const [auth, setAuth] = useState<Partial<Auth>>({});

  const doLogin = async () => {
    if (auth.email && auth.password) {
      const result = await AuthModel.login(auth.email, auth.password);

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
