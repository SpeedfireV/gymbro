import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";

interface TrainingPublicityStatusData {
  isPublic: boolean;
}

export default function TrainingPublicityStatus({
  isPublic,
}: TrainingPublicityStatusData) {
  const PRIVATE_ICON = "person-circle-outline";
  const PUBLIC_ICON = "earth-outline";
  return (
    <View style={styles.doubleHolder}>
      <Ionicons
        name={isPublic ? PUBLIC_ICON : PRIVATE_ICON}
        size={30}
        color="#FFA500"
      />
      <Text style={styles.orangeText}>{isPublic ? "PUBLIC" : "PRIVATE"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  doubleHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    flex: 0.48,
  },
  orangeText: {
    color: colors.activeYellow,
    fontFamily: fonts.bigShouldersBlack,
    fontSize: 20,
    marginLeft: 8,
  },
});
