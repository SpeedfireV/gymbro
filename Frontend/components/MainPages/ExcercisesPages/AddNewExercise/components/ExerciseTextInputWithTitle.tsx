import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";

interface ExerciseTextInputWithTitleData {
  fieldTitle: string;
  setTextFunc: (text: string) => void;
  value: string;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export default function ExerciseTextInputWithTitle({
  fieldTitle,
  setTextFunc,
  value = "",
  placeholder = "",
  multiline = false,
  autoCapitalize = "sentences",
}: ExerciseTextInputWithTitleData) {
  return (
    <View style={{ marginHorizontal: 24, flex: multiline ? 1 : undefined }}>
      <Text
        style={{
          fontSize: 24,
          fontFamily: fonts.bigShouldersMedium,
          color: colors.platiniumWhite,
          marginBottom: 8,
        }}
      >
        {fieldTitle}
      </Text>
      <TextInput
        style={multiline ? styles.multilineInput : styles.singleLineInput}
        multiline={multiline}
        onChangeText={setTextFunc}
        placeholder={placeholder}
        placeholderTextColor={colors.platiniumWhiteOpacity}
        value={value}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  multilineInput: {
    backgroundColor: colors.inputBackground,
    minHeight: 64,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
    fontFamily: fonts.chakraPetchExtraLight,
    color: colors.platiniumWhite,
    fontSize: 18,
    paddingLeft: 16,
    flex: 1,
    textAlignVertical: "top",
    textAlign: "left",
  },
  singleLineInput: {
    backgroundColor: colors.inputBackground,
    minHeight: 64,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
    fontFamily: fonts.chakraPetchExtraLight,
    color: colors.platiniumWhite,
    fontSize: 18,
    paddingLeft: 16,
  },
});
