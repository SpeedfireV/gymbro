import { View } from "react-native";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import TextInputWithTitle from "../../ReusableComponents/TextInputWithTitle";
import Spacer from "../../ReusableComponents/Spacer";
import { colors } from "../../../Colors";
import RegisterButton from "./components/RegisterButton";
import AuthTitle from "../components/AuthTitle";
import { handleRegistration } from "./RegistrationLogic";
import AlreadyHaveAccountRow from "./components/AlreadyHaveAccountRow";

export function RegistrationPage({
  navigation,
}: StackScreenProps<RootStackParamList, "Registration">) {
  const [nicknameText, setNicknameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwrodText, setPasswordText] = useState("");
  const [passwrodRepText, setPasswordRepText] = useState("");
  const [isPasswordVis, setPasswordVis] = useState(false);
  const [isRepPasswordVis, setRepPasswordVis] = useState(false);

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const changePassVis = () => {
    setPasswordVis(!isPasswordVis);
  };

  const changeRepPassVis = () => {
    setRepPasswordVis(!isRepPasswordVis);
  };

  return (
    <View style={styles.container}>
      <AuthTitle title="REGISTRATION" />
      <Spacer />
      <View style={{ flexDirection: "column", gap: 32, marginBottom: 48 }}>
        <TextInputWithTitle
          fieldTitle="Nickname"
          placeholder="Your fantastic nickname"
          value={nicknameText}
          onChangeText={setNicknameText}
          autoCapitalize="none"
        />
        <TextInputWithTitle
          fieldTitle="Email"
          placeholder="example@mail.com"
          value={emailText}
          onChangeText={setEmailText}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInputWithTitle
          fieldTitle="Password"
          placeholder="Enter your super secure password"
          value={passwrodText}
          onChangeText={setPasswordText}
          autoCapitalize="none"
          secureTextEntry={!isPasswordVis}
          suffixIcon={isPasswordVis ? "visibilityOff" : "visibility"}
          suffixIconOnPress={changePassVis}
        />
        <TextInputWithTitle
          fieldTitle="Repeat Password"
          placeholder="Repeat your super secure password"
          value={passwrodRepText}
          onChangeText={setPasswordRepText}
          autoCapitalize="none"
          secureTextEntry={!isRepPasswordVis}
          suffixIcon={isRepPasswordVis ? "visibilityOff" : "visibility"}
          suffixIconOnPress={changeRepPassVis}
        />
      </View>
      <RegisterButton
        handleRegistration={() =>
          handleRegistration(emailText, passwrodText, passwrodRepText, nicknameText)
        }
      />
      <AlreadyHaveAccountRow handleLogin={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
});
