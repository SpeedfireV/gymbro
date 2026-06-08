import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "../../../../../Icons";
import { fonts } from "../../../../../Fonts";
import { colors } from "../../../../../Colors";

export default function AddMedia() {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon
        name="add"
        fill={colors.activeYellow}
        width={24}
        height={24}
        style={styles.icon}
      />
      <Text style={styles.text}>Add Media</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 24,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.bigShouldersBold,
    color: colors.activeYellow,
  },
});
