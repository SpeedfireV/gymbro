import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";

interface TrainingCardHeaderRowData {
  title: string;
  muscles: string;
}

export default function TrainingCardHeaderRow({
  title,
  muscles,
}: TrainingCardHeaderRowData) {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.muscles}>{muscles}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 15,
  },
  title: {
    color: colors.platiniumWhite,
    fontSize: 24,
    fontFamily: fonts.bigShouldersExtraBold,
  },
  muscles: {
    color: colors.platiniumWhite,
    fontSize: 20,
    fontFamily: fonts.chakraPetchSemiBold,
  },
});
