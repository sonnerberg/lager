import { View, Text, Button, ScrollView } from "react-native";
import Auth from "../../interfaces/Auth";
import { Typography, Forms, Base } from "../../styles";
import { HelperText, TextInput } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { validate } from "@babel/types";

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
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const validatePassword = (password: string | undefined) => {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-}]).{4,}$/;
        if (password) {
            if (password.match(pattern)) {
                return true;
            }
        }
        return false;
    };

    const validateEmail = (email: string | undefined) => {
        const pattern =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email) {
            if (email.match(pattern)) {
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        if (validateEmail(auth.email)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    }, [auth.email]);

    useEffect(() => {
        if (validatePassword(auth.password)) {
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }
    }, [auth.password]);
    return (
        <ScrollView>
            <Text style={Typography.header2}>{title}</Text>
            <TextInput
                label="E-post"
                mode="outlined"
                onChangeText={(email: string) => {
                    setAuth({ ...auth, email });
                }}
                value={auth?.email}
                keyboardType="email-address"
                error={emailError}
            />
            <HelperText type="error" visible={emailError}>
                Email address is invalid.
            </HelperText>
            <TextInput
                mode="outlined"
                label="Lösenord"
                onChangeText={(password: string) => {
                    setAuth({ ...auth, password });
                }}
                value={auth?.password}
                secureTextEntry={true}
                error={passwordError}
            />
            <HelperText type="error" visible={passwordError}>
                Password has to be 4 characters and include at least one capital
                letter, one lower case letter, a digit and an optional symbol
                (!, ., -).
            </HelperText>
            <Button title={title} onPress={submit} />
            {title === "Logga in" && (
                <Button
                    title="Registrera i stället"
                    onPress={() => {
                        navigate("Register");
                    }}
                />
            )}
        </ScrollView>
    );
};

export default AuthFields;
