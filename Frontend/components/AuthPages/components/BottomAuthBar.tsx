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
    paddingHorizontal: 20,
  },
  titleBox: {
    paddingTop: 80,
    marginBottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBox: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontFamily: "SairaStencil-reg",
    color: colors.activeYellow,
    textAlign: "center",
    marginTop: 64,
    fontSize: 48,
    transform: [{ scaleY: 1.5 }, { scaleX: 0.9 }],
  },

  textBold: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Impact-Local",
    paddingTop: 25,
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

  frameContainer: {
    flexDirection: "row",
    backgroundColor: "#222222",
    borderColor: "#FFFFFF",
    fontSize: 16,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    paddingRight: 10,
    width: "100%",
    alignItems: "center",
  },

  frameText: {
    flex: 1,
    fontFamily: "ChakraPetch-ExtraLight",
    color: "#fff8e5",
    fontSize: 12,
  },
});
