import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from "../../styles";

const AuthFields = ({ auth, setAuth, title, submit, navigation }) => {
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
            navigation.navigate("Register");
          }}
        />
      )}
    </View>
  );
};

export default AuthFields;
