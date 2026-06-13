import { TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../../../../Colors";
import { fonts } from "../../../../Fonts";

interface LoginButtonProps {
  handleLogin: () => void;
}

export default function LoginButton({ handleLogin }: LoginButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={(e: any) => {
        handleLogin();
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>LOGIN</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.activeYellow,
    borderRadius: 16,
    height: 80,
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.coffeeBackground,
    fontSize: 28,
    fontFamily: fonts.bigShouldersExtraBold,
  },
});
