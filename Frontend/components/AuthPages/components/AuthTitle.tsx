import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../Colors";
import { fonts } from "../../../Fonts";

interface AuthTitleProps {
  title: string;
}

export default function AuthTitle({ title }: AuthTitleProps) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.sairaStencilReg,
    color: colors.activeYellow,
    textAlign: "center",
    marginTop: 64,
    fontSize: 48,
    transform: [{ scaleY: 1.5 }, { scaleX: 0.9 }],
  },
});
