import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "../../../../../Icons";

export default function AddMedia() {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 16,
        marginHorizontal: 24,
      }}
    >
      <Icon
        name="add"
        fill={"#FBAF00"}
        width={24}
        height={24}
        style={{ marginRight: 4 }}
      />

      <Text
        style={{
          fontSize: 24,
          fontFamily: "BigShoulders-Bold",
          color: "#FBAF00",
        }}
      >
        Add Media
      </Text>
    </TouchableOpacity>
  );
}
