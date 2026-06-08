import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Icon } from "../../../../../Icons";

export default function ImageCarousel() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 24,
        marginBottom: 24,
      }}
    >
      <TouchableOpacity
        style={{ backgroundColor: "#FBAF00", borderRadius: 45, padding: 8 }}
      >
        <Icon name="arrowLeft" fill={"#ffffff"} width={24} height={24} />
      </TouchableOpacity>
      <View>
        <Image
          source={require("../../../../../assets/placeholder_images/exercise_image.png")}
          style={{ borderRadius: 12 }}
        ></Image>

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 8,
            left: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#EFF1F3",
            backgroundColor: "#FBAF00",
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="star" fill={"#322214"} width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 8,
            right: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#EFF1F3",
            backgroundColor: "#E03616",
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="delete" fill={"#EFF1F3"} width={24} height={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "#FBAF00", borderRadius: 45, padding: 8 }}
      >
        <Icon name="arrowRight" fill={"#ffffff"} width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
}
