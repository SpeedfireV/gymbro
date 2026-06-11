import { TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";

export default function EditTitle() {
  return <TextInput style={styles.titleEditText}>PULL UPS</TextInput>;
}

const styles = StyleSheet.create({
  titleEditText: {
    backgroundColor: colors.inputBackground,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 24,
    fontSize: 18,
    fontFamily: fonts.chakraPetchRegular,
    color: colors.platiniumWhite,
    marginTop: 48,
  },
});
