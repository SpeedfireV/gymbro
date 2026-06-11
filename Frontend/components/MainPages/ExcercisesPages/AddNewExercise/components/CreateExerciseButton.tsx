import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";
import { useNavigation } from "@react-navigation/native";

interface CreateExerciseData {
  bodyParts: Array<string>;
  name: string;
  description: string;
}

export default function CreateExerciseButton({
  bodyParts,
  name,
  description,
}: CreateExerciseData) {
  const enabled = bodyParts.length > 0 && name.length > 0;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={enabled ? styles.enabledButton : styles.disabledButton}
      onPress={() => {
        navigation.goBack;
      }}
      disabled={!enabled}
    >
      <Text style={enabled ? styles.enabledText : styles.disabledText}>
        CREATE EXERCISE
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  enabledButton: {
    backgroundColor: colors.activeYellow,
    borderRadius: 12,
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  enabledText: {
    fontSize: 28,
    fontFamily: fonts.bigShouldersExtraBold,
    color: colors.platiniumWhite,
  },
  disabledText: {
    fontSize: 28,
    fontFamily: fonts.bigShouldersExtraBold,
    color: colors.onSurface,
  },
});
