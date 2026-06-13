import { TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";

interface EditTrainingDescriptionProps {
  description: string;
  setDescription: (value: string) => void;
}

export default function EditTrainingDescription({
  description,
  setDescription,
}: EditTrainingDescriptionProps) {
  return (
    <TextInput
      value={description}
      style={styles.description}
      onChangeText={setDescription}
      multiline={true}
      numberOfLines={4}
      textAlignVertical="top"
      textAlign="center"
    />
  );
}

const styles = StyleSheet.create({
  description: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
    borderRadius: 4,
    height: 80,
    color: colors.platiniumWhite,
    fontFamily: fonts.chakraPetchRegular,
    fontSize: 16,
  },
});
