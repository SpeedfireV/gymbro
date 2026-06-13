import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../Colors";
import { fonts } from "../../../../Fonts";
import BottomAuthBar from "../../components/BottomAuthBar";

interface AlreadyHaveAccountRowProps {
  handleLogin: () => void;
}

export default function AlreadyHaveAccountRow({
  handleLogin,
}: AlreadyHaveAccountRowProps) {
  return (
    <BottomAuthBar
      hintText="Already have an account?"
      buttonText="Login"
      onPress={handleLogin}
    />
  );
}
