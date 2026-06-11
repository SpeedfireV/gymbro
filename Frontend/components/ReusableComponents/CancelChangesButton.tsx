import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Cancel from "../../assets/icons/cancel.svg";
import React from "react";

interface CancelChangesButtonData {
  onPress?: () => void;
}

export default function CancelChangesButton({
  onPress,
}: CancelChangesButtonData) {
  return (
    <TouchableOpacity style={styles.publishButton} onPress={onPress}>
      <Cancel
        width={32}
        height={32}
        fill={"#EFF1F3"}
        style={styles.cancelIcon}
      />
      <Text style={styles.publishPrefix}>CANCEL CHANGES</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  publishButton: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#E03616",
    padding: 16,
    height: 64,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelIcon: {
    marginRight: 8,
    alignSelf: "center",
  },
  publishPrefix: {
    fontFamily: "BigShoulders-SemiBold",
    fontSize: 28,
    color: "#EFF1F3",
    marginRight: 8,
    lineHeight: 28,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  publishTarget: {
    fontFamily: "BigShoulders-Bold",
    fontSize: 28,
    color: "#322214",
    lineHeight: 28,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
