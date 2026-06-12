import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../Colors";
import { fonts } from "../../../../Fonts";
import { Icon, IconName } from "../../../../Icons";

interface ExerciseCardInfoTileProps {
  editable: boolean;
  icon: IconName;
  text: string;
}

export default function ExerciseCardInfoTile({
  editable,
  icon,
  text,
}: ExerciseCardInfoTileProps) {
  const iconAndTextColor = editable
    ? colors.platiniumWhite
    : colors.coffeeBackground;
  return (
    <View
      style={[
        styles.card,
        editable ? styles.cardColorsEditable : styles.cardColors,
      ]}
    >
      <Icon name={icon} width={24} height={24} fill={iconAndTextColor} />

      <Text style={[styles.text, { color: iconAndTextColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  cardColorsEditable: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
  },
  cardColors: {
    backgroundColor: colors.platiniumWhite,
  },
  text: {
    fontFamily: fonts.chakraPetchSemiBold,
    fontSize: 16,
  },
});
