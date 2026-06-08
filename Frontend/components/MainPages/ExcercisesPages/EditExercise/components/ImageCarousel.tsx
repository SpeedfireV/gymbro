import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "../../../../../Icons";
import { colors } from "../../../../../Colors";

export default function ImageCarousel() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowButton}>
        <Icon
          name="arrowLeft"
          fill={colors.platiniumWhite}
          width={24}
          height={24}
        />
      </TouchableOpacity>

      <View>
        <Image
          source={require("../../../../../assets/placeholder_images/exercise_image.png")}
          style={styles.image}
        />

        <TouchableOpacity style={[styles.overlayButton, styles.favoriteButton]}>
          <Icon
            name="star"
            fill={colors.coffeeBackground}
            width={24}
            height={24}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.overlayButton, styles.deleteButton]}>
          <Icon
            name="delete"
            fill={colors.platiniumWhite}
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.arrowButton}>
        <Icon
          name="arrowRight"
          fill={colors.platiniumWhite}
          width={24}
          height={24}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  arrowButton: {
    backgroundColor: colors.activeYellow,
    borderRadius: 45,
    padding: 8,
  },
  image: {
    borderRadius: 12,
  },
  overlayButton: {
    position: "absolute",
    top: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    left: 16,
    backgroundColor: colors.activeYellow,
  },
  deleteButton: {
    right: 16,
    backgroundColor: colors.fireRed,
  },
});
