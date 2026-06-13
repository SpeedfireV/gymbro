import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../Colors";
import { fonts } from "../../../Fonts";

interface BottomAuthBarProps {
  hintText: string;
  buttonText: string;
  onPress: () => void;
}

export default function BottomAuthBar({
  hintText,
  buttonText,
  onPress,
}: BottomAuthBarProps) {
  return (
    <View style={styles.bottomBox}>
      <Text style={styles.text}>{hintText}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textGold}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  bottomBox: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    marginBottom: 24,
  },

  text: {
    color: colors.platiniumWhite,
    fontSize: 24,
    fontFamily: fonts.bigShouldersThin,
  },
  textGold: {
    color: colors.activeYellow,
    fontSize: 28,
    fontFamily: fonts.bigShouldersBold,
  },
});
