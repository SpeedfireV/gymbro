import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { StyleSheet } from "react-native";
import TextInputWithTitle from "../../ReusableComponents/TextInputWithTitle";
import LoginButton from "./components/LoginButton";
import BottomAuthBar from "../components/BottomAuthBar";
import Spacer from "../../ReusableComponents/Spacer";
import { colors } from "../../../Colors";
import { handleLogin } from "./LoginLogic";
import AuthTitle from "../components/AuthTitle";

export function LoginScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Login">) {
  const [emailText, setEmailText] = useState("");
  const [passwrodText, setPasswordText] = useState("");
  const [isPasswordVis, setPasswordVis] = useState(false);

  const handleRegistration = () => {
    navigation.navigate("Registration");
  };

  const changePassVis = () => {
    setPasswordVis(!isPasswordVis);
  };

  return (
    <View style={styles.container}>
      <AuthTitle title="LOGIN" />
      <Spacer />
      <View style={styles.textFieldsCol}>
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
          keyboardType="email-address"
          autoCapitalize="none"
          secureTextEntry={!isPasswordVis}
          suffixIcon={isPasswordVis ? "visibilityOff" : "visibility"}
          suffixIconOnPress={changePassVis}
        />
      </View>
      <LoginButton handleLogin={() => handleLogin(emailText, passwrodText)} />
      {/* TODO: DELETE INSTA LOGIN! */}
      <TouchableOpacity
        style={{
          height: 120,
          width: "100%",
          backgroundColor: colors.activeYellow,
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 48 }}>INSTA LOGIN [CLICK]</Text>
      </TouchableOpacity>
      <BottomAuthBar
        hintText="Don't have an account?"
        buttonText="Register"
        onPress={handleRegistration}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  textFieldsCol: {
    gap: 32,
    marginBottom: 48,
  },
});
