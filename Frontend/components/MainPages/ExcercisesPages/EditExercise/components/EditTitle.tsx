import { TextInput, StyleSheet } from "react-native";
import React from "react";

export default function EditTitle() {
  return (
    <TextInput style={[styles.editArea, styles.titleEditText]}>
      PULL UPS
    </TextInput>
  );
}

const styles = StyleSheet.create({
  editArea: {
    backgroundColor: "#242423",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#EFF1F3",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  titleEditText: {
    fontSize: 18,
    fontFamily: "ChakraPetch-Regular",
    color: "#EFF1F3",
    marginTop: 48,
    marginHorizontal: 24,
    marginBottom: 24,
  },
});
