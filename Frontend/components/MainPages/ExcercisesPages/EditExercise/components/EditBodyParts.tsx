import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "../../../../../Icons";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";

export default function EditBodyParts() {
  return (
    <TouchableOpacity style={styles.editArea}>
      <View style={styles.labelContainer}>
        <Icon
          name="sports"
          fill={colors.platiniumWhite}
          width={24}
          height={24}
          style={styles.icon}
        />
        <Text style={styles.bodyPartsText}>BODY PARTS</Text>
      </View>
      <Text style={styles.descEditText}>Triceps</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  editArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  bodyPartsText: {
    fontSize: 20,
    fontFamily: fonts.chakraPetchBold,
    color: colors.platiniumWhite,
  },
  descEditText: {
    fontSize: 16,
    fontFamily: fonts.chakraPetchRegular,
    color: colors.platiniumWhite,
  },
});
