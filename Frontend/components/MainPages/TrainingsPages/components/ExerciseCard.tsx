import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../Colors";
import { fonts } from "../../../../Fonts";
import ExerciseCardInfoTile from "./ExerciseCardInfoTile";
import { Icon } from "../../../../Icons";

interface ExerciseSimpleTileProps {
  name: string;
  muscle: string;
  order: number;
  sitsreps: string;
  duration: string;
  editable: boolean;
  innerBreakDuration: string;
  isRepeating?: boolean;
  onDelete?: () => void;
}

export default function ExerciseCard({
  name,
  muscle,
  order,
  sitsreps,
  duration,
  editable,
  innerBreakDuration,
  isRepeating = true,
  onDelete,
}: ExerciseSimpleTileProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.exerciseTitleText}>
          {order}. {name}
        </Text>
        <Text style={styles.bodyPartsText}>{muscle}</Text>
      </View>

      {isRepeating ? (
        <View style={styles.infoRow}>
          <ExerciseCardInfoTile
            editable={editable}
            icon="sports"
            text={sitsreps}
          />
          <ExerciseCardInfoTile
            editable={editable}
            icon="time"
            text={innerBreakDuration}
          />
        </View>
      ) : (
        <View style={styles.infoRow}>
          <ExerciseCardInfoTile
            editable={editable}
            icon="time"
            text={duration}
          />
        </View>
      )}
      {editable ? (
        <TouchableOpacity
          style={styles.removeButton}
          activeOpacity={0.7}
          onPress={onDelete}
        >
          <Icon
            name="delete"
            fill={colors.platiniumWhite}
            width={24}
            height={24}
          />
          <Text style={styles.buttonText}>Remove Exercise</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.onSurface,
    borderRadius: 12,
    padding: 16,
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
    boxShadow: `0px 0px 8px ${colors.activeYellow}`,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  exerciseTitleText: {
    color: colors.platiniumWhite,
    fontSize: 24,
    fontFamily: fonts.bigShouldersBold,
  },
  bodyPartsText: {
    color: colors.platiniumWhite,
    fontSize: 20,
    fontFamily: fonts.chakraPetchSemiBold,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  dualWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#2c2c2e",
    borderWidth: 1,
    borderColor: "#48484a",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
  },
  simpleText: {
    color: "#ffffff",
    fontSize: 14,

    textTransform: "uppercase",
  },
  removeButton: {
    backgroundColor: colors.fireRed,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 12,
    gap: 8,
    width: "100%",
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: colors.platiniumWhite,
    fontSize: 24,
    fontFamily: fonts.bigShouldersBold,
  },

  dualWrapperWhite: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ECF0F3",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWhite: {
    marginRight: 8,
    color: "#2D241E",
  },
  simpleTextWhite: {
    color: "#2D241E",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
