import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";
import { Icon, IconName } from "../../../../../Icons";

interface TrainingDetailsInfoElemData {
  icon: IconName;
  title: string;
  description: string;
}

export default function TrainingDetailsInfoElem({
  icon,
  title,
  description,
}: TrainingDetailsInfoElemData) {
  return (
    <View style={styles.infoFrame}>
      <View style={styles.leftSide}>
        <Icon name={icon} fill={colors.platiniumWhite} />
        <Text style={styles.descTitle}>{title}</Text>
      </View>
      <Text style={styles.descText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoFrame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  descTitle: {
    color: colors.platiniumWhite,
    fontFamily: fonts.chakraPetchBold,
    fontSize: 20,
  },
  descText: {
    color: colors.platiniumWhite,
    fontFamily: fonts.chakraPetchMedium,
    fontSize: 16,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
