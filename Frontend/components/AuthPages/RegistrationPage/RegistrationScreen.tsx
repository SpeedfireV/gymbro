import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import TextInputWithTitle from "../../ReusableComponents/TextInputWithTitle";
import Spacer from "../../ReusableComponents/Spacer";
import { colors } from "../../../Colors";
import RegisterButton from "./components/RegisterButton";
import AlreadyHaveAccountRow from "./components/AlreadyHaveAccountRow";
import { fonts } from "../../../Fonts";

export function RegistrationPage({
  navigation,
}: StackScreenProps<RootStackParamList, "Registration">) {
  const [nicknameText, setNicknameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwrodText, setPasswordText] = useState("");
  const [passwrodRepText, setPasswordRepText] = useState("");
  const [isPasswordVis, setPasswordVis] = useState(false);
  const [isRepPasswordVis, setRepPasswordVis] = useState(false);

  const handleRegistration = () => {
    console.log("AttemptLogEmail: ", emailText);
    console.log("AttemptLogPass: ", passwrodText);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email
    if (!emailRegex.test(emailText)) {
      console.log("Email Fail");
      alert("Wrong Email");
      return;
    }

    // PassCap
    if (!/[A-Z]/.test(passwrodText)) {
      console.log("Pass capitalization Fail");
      alert("Wrong password(No capitalized letter)");
      return;
    }

    // PassSmall
    if (!/[a-z]/.test(passwrodText)) {
      console.log("Pass small letter Fail");
      alert("Wrong password(No small letter)");
      return;
    }

    // PassLength
    if (passwrodText.length < 8) {
      console.log("Pass length fail");
      alert("Wrong password, too short. Must be longer than eight characters");
      return;
    }

    if (passwrodText != passwrodRepText) {
      console.log("Pass length fail");
      alert("Repeated password is diffrent, than provided password.");
      return;
    }

    console.log("Registration attempt");
  };

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
      <Text style={styles.title}>REGISTER</Text>
      <Spacer />
      <View style={{ flexDirection: "column", gap: 32, marginBottom: 48 }}>
        <TextInputWithTitle
          fieldTitle="Nickname"
          placeholder="Your fantastic nickname"
          placeholderTextColor="#777777"
          value={nicknameText}
          onChangeText={setNicknameText}
          autoCapitalize="none"
        />
        <TextInputWithTitle
          fieldTitle="Email"
          placeholder="example@mail.com"
          placeholderTextColor="#777777"
          value={emailText}
          onChangeText={setEmailText}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInputWithTitle
          fieldTitle="Password"
          placeholder="Enter your super secure password"
          placeholderTextColor="#777777"
          value={passwrodText}
          onChangeText={setPasswordText}
          keyboardType="email-address"
          autoCapitalize="none"
          secureTextEntry={!isPasswordVis}
          suffixIcon={isPasswordVis ? "visibilityOff" : "visibility"}
          suffixIconOnPress={changePassVis}
        />
        <TextInputWithTitle
          fieldTitle="Repeat Password"
          placeholder="Repeat your super secure password"
          placeholderTextColor="#777777"
          value={passwrodRepText}
          onChangeText={setPasswordRepText}
          keyboardType="email-address"
          autoCapitalize="none"
          secureTextEntry={!isRepPasswordVis}
          suffixIcon={isRepPasswordVis ? "visibilityOff" : "visibility"}
          suffixIconOnPress={changeRepPassVis}
        />
      </View>

      <RegisterButton handleRegistration={handleRegistration} />

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
  titleBox: {
    paddingTop: 80,
    marginBottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 30,
  },

  title: {
    fontFamily: fonts.sairaStencilReg,
    color: colors.activeYellow,
    textAlign: "center",
    marginTop: 64,
    fontSize: 48,
    transform: [{ scaleY: 1.5 }, { scaleX: 0.9 }],
  },

  textBold: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Impact-Local",
    paddingTop: 25,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Antonio",
  },
  textGold: {
    color: "#FFB700",
    fontSize: 16,
    fontFamily: "Antonio",
  },

  frameContainer: {
    flexDirection: "row",
    backgroundColor: "#222222",
    borderColor: "#FFFFFF",
    fontSize: 16,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    paddingRight: 10,
    width: "100%",
    alignItems: "center",
  },

  frameText: {
    flex: 1,
    fontFamily: "ChakraPetch-ExtraLight",
    color: "#fff8e5",
    fontSize: 12,
  },
});
