import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { StyleSheet } from "react-native";
import TextInputWithTitle from "../../ReusableComponents/TextInputWithTitle";
import LoginButton from "./components/LoginButton";
import BottomAuthBar from "../components/BottomAuthBar";
import Spacer from "../../ReusableComponents/Spacer";
import { colors } from "../../../Colors";
import { fonts } from "../../../Fonts";

export function LoginScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "Login">) {
  const [emailText, setEmailText] = useState("");
  const [passwrodText, setPasswordText] = useState("");
  const [isPasswordVis, setPasswordVis] = useState(false);

  const handleLogin = () => {
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
      alert("Wrong password(No capitalized letter))");
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

    console.log("Try login");
    navigation.navigate("Home");

    console.log("Success");
  };

  const handleRegistration = () => {
    navigation.navigate("Registration");
  };

  const changePassVis = () => {
    setPasswordVis(!isPasswordVis);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Spacer />
      <View style={styles.textFieldsCol}>
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
      </View>
      <LoginButton handleLogin={handleLogin} />
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
  titleBox: {
    paddingTop: 80,
    marginBottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  textFieldsCol: {
    gap: 32,
    marginBottom: 48,
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
