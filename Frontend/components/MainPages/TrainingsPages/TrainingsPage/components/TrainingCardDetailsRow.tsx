import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";

interface TrainingCardDetailsRowData {
  exercisesCount: number;
  duration: string;
}

export default function TrainingCardDetailsRow({
  exercisesCount,
  duration,
}: TrainingCardDetailsRowData) {
  return (
    <View style={styles.splitter}>
      <View style={styles.infoFrame}>
        <Ionicons name="barbell-outline" size={20} color="#000" />
        <Text style={styles.frameText}>{exercisesCount} Excercises</Text>
      </View>
      <View style={styles.infoFrame}>
        <Ionicons name="time-outline" size={20} color="#000" />
        <Text style={styles.frameText}>{duration}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splitter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoFrame: {
    backgroundColor: colors.platiniumWhite,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 4,
    flex: 0.48,
  },
  frameText: {
    fontFamily: fonts.chakraPetchSemiBold,
    color: colors.coffeeBackground,
    fontSize: 16,
    paddingLeft: 8,
  },
});
