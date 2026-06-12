import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../Colors";
import { fonts } from "../../../../Fonts";
import { Icon, IconName } from "../../../../Icons";

interface ExerciseCardInfoTileProps {
  editable: boolean;
  icon: IconName;
  text: string;
  onPress?: () => void;
}

export default function ExerciseCardInfoTile({
  editable,
  icon,
  text,
  onPress,
}: ExerciseCardInfoTileProps) {
  const iconAndTextColor = editable
    ? colors.platiniumWhite
    : colors.coffeeBackground;
  return (
    <TouchableOpacity
      style={[
        styles.card,
        editable ? styles.cardColorsEditable : styles.cardColors,
      ]}
      onPress={onPress}
    >
      <Icon name={icon} width={24} height={24} fill={iconAndTextColor} />

      <Text style={[styles.text, { color: iconAndTextColor }]}>{text}</Text>
    </TouchableOpacity>
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
