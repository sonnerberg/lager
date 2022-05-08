import { View, Text, TextInput, Button } from "react-native";
import Auth from "../../interfaces/Auth";
import { Typography, Forms, Base } from "../../styles";

interface Props {
  auth: Partial<Auth>;
  setAuth: React.Dispatch<React.SetStateAction<Partial<Auth>>>;
  submit: Function;
  title: string;
  navigation: { navigate: Function };
}
const AuthFields = ({
  auth,
  setAuth,
  title,
  submit,
  navigation: { navigate },
}: Props) => {
  return (
    <View>
      <Text style={Typography.header2}>{title}</Text>
      <Text style={Typography.label}>E-post</Text>
      <TextInput
        style={Forms.input}
        onChangeText={(email: string) => {
          setAuth({ ...auth, email });
        }}
        value={auth?.email}
        keyboardType="email-address"
      />
      <Text style={Typography.label}>Lösenord</Text>
      <TextInput
        style={Forms.input}
        onChangeText={(password: string) => {
          setAuth({ ...auth, password });
        }}
        value={auth?.password}
        secureTextEntry={true}
      />
      <Button title={title} onPress={submit} />
      {title === "Logga in" && (
        <Button
          title="Registrera i stället"
          onPress={() => {
            navigate("Register");
          }}
        />
      )}
    </View>
  );
};

export default AuthFields;
