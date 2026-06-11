import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "../../../../../Icons";
import { colors } from "../../../../../Colors";

export default function SelectBodyPartsBottomSheet() {
  return (
    <View style={{ minHeight: 400 }}>
      <View style={{ flexDirection: "row" }}>
        <Text>BODY PARTS</Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.fireRed,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: colors.coffeeBackground,
          }}
        >
          <Icon name="delete" fill={colors.platiniumWhite}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}
