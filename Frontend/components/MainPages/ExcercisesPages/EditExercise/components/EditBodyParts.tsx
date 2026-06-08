import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "../../../../../Icons";

export default function EditBodyParts() {
  return (
    <TouchableOpacity
      style={[
        styles.editArea,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name="sports"
          fill={"#FFFFFF"}
          width={24}
          height={24}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.bodyPartsText}>BODY PARTS</Text>
      </View>
      <Text style={styles.descEditText}>Triceps</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  editArea: {
    backgroundColor: "#242423",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#EFF1F3",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  bodyPartsText: {
    fontSize: 20,
    fontFamily: "ChakraPetch-Bold",
    color: "#FFFFFF",
  },
  descEditText: {
    fontSize: 16,
    fontFamily: "ChakraPetch-Regular",
    color: "#EFF1F3",
  },
});
