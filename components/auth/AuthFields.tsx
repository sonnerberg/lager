import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from "../../styles";

const AuthFields = ({ auth, setAuth, title, submit, navigation }) => {
  return (
    <View>
      <Text style={Typography.header2}>{title}</Text>
      <Text style={Typography.label}>E-post</Text>
      <TextInput
        // TODO: change content to email as a test
        style={Forms.input}
        onChangeText={(content: string) => {
          setAuth({ ...auth, email: content });
        }}
        value={auth?.email}
        keyboardType="email-address"
      />
      <Text style={Typography.label}>Lösenord</Text>
      {/*  TODO: change content to password as a test */}
      <TextInput
        style={Forms.input}
        onChangeText={(content: string) => {
          setAuth({ ...auth, password: content });
        }}
        value={auth?.password}
        secureTextEntry={true}
      />
      <Button title={title} onPress={submit} />
      {/*  TODO: Create interface for title (Logga in / registera) */}
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
