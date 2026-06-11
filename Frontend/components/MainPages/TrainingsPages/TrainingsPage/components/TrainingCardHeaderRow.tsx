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
  card: {
    backgroundColor: colors.onSurface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#332b00",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#FFA500",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
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
  description: {
    color: colors.platiniumWhite,
    fontSize: 16,
    fontFamily: fonts.chakraPetchRegular,
    textAlign: "center",
    marginBottom: 16,
  },
  Splitter: {
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
    flex: 0.44,
  },

  doubleHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    flex: 0.48,
  },

  frameText: {
    fontFamily: fonts.chakraPetchSemiBold,
    color: colors.coffeeBackground,
    fontSize: 16,
    paddingLeft: 8,
  },

  orangeText: {
    color: colors.activeYellow,
    fontFamily: fonts.bigShouldersBlack,
    fontSize: 20,
    marginLeft: 8,
  },
});
