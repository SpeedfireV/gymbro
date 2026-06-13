import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "../../../../../Icons";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";

interface AddExerciseOrBreakProps {
  setIsAddExerciseVisible: (value: boolean) => void;
  setIsAddBreakVisible: (value: boolean) => void;
}

export default function AddExerciseOrBreak({
  setIsAddExerciseVisible,
  setIsAddBreakVisible,
}: AddExerciseOrBreakProps) {
  return (
    <View style={styles.AdderButtonWrapper}>
      <TouchableOpacity
        style={styles.AdderButton}
        onPress={() => {
          setIsAddExerciseVisible(true);
        }}
        activeOpacity={0.7}
      >
        <Icon name="add" fill={colors.activeYellow} width={24} height={24} />
        <Text style={styles.AdderText}>Add Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.AdderButton}
        onPress={() => {
          setIsAddBreakVisible(true);
        }}
        activeOpacity={0.7}
      >
        <Icon name="add" fill={colors.activeYellow} width={24} height={24} />
        <Text style={styles.AdderText}>Add Break</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  AdderButtonWrapper: {
    alignItems: "flex-end",
    marginBottom: 100,
    gap: 8,
  },
  AdderButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  AdderText: {
    color: colors.activeYellow,
    fontSize: 24,
    fontFamily: fonts.bigShouldersBold,
  },
});
