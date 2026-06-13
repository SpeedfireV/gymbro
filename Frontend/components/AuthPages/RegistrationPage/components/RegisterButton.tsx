import { TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../../../../Colors";
import { fonts } from "../../../../Fonts";

interface RegisterButtonProps {
  handleRegistration: () => void;
}

export default function RegisterButton({
  handleRegistration,
}: RegisterButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleRegistration}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>REGISTER</Text>
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
