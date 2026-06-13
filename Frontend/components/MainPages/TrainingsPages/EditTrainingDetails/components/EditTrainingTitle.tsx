import { View, Text, TextInput } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";

interface EditTrainingTitleProps {
  title: string;
  setTitle: (title: string) => void;
}

export default function EditTrainingTitle({
  title,
  setTitle,
}: EditTrainingTitleProps) {
  return (
    <TextInput
      style={{
        borderRadius: 4,
        backgroundColor: colors.inputBackground,
        borderWidth: 1,
        borderColor: colors.platiniumWhite,
        fontFamily: fonts.chakraPetchMedium,
        fontSize: 18,
        color: colors.platiniumWhite,
      }}
      placeholder="AFAFA"
      value={title}
      onChangeText={setTitle}
      textAlign="left"
      textAlignVertical="center"
    />
  );
}
