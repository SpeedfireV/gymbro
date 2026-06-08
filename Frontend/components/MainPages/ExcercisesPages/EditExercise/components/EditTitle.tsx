import { TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";

export default function EditTitle() {
  return (
    <TextInput style={[styles.editArea, styles.titleEditText]}>
      PULL UPS
    </TextInput>
  );
}

const styles = StyleSheet.create({
  editArea: {
    backgroundColor: colors.inputBackground,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  titleEditText: {
    fontSize: 18,
    fontFamily: "ChakraPetch-Regular",
    color: colors.platiniumWhite,
    marginTop: 48,
    marginHorizontal: 24,
    marginBottom: 24,
  },
});
