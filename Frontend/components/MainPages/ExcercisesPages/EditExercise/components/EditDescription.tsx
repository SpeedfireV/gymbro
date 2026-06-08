import { TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";

export default function EditDescription() {
  return (
    <TextInput style={[styles.editArea, styles.descEditText]} multiline={true}>
      Pull ups are a great exercise for building upper body strength,
      particularly targeting the back muscles. To perform a pull up, grip the
      bar with your hands slightly wider than shoulder-width apart, and pull
      your body up until your chin is above the bar. Lower yourself back down
      with control and repeat for the desired number of repetitions.
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
  descEditText: {
    fontSize: 16,
    fontFamily: "ChakraPetch-Regular",
    color: colors.platiniumWhite,
  },
});
