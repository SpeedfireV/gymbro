import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../Colors";
import { fonts } from "../../../Fonts";

interface ExerciseSimpleTileProps {
  name: string;
  muscle: string[];
  detail: string;
  order: number;
  editable: boolean;
  innerBreakDuration: string;
  isRepeating?: boolean;
  onDelete?: () => void;
}

export default function ExerciseCard({
  name,
  muscle,
  order,
  detail,
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

      <View style={styles.infoRow}>
        {isRepeating ? (
          <View style={editable ? styles.dualWrapper : styles.dualWrapperWhite}>
            <Ionicons
              name="barbell"
              size={18}
              color={editable ? "#ffffff" : "#000000"}
              style={styles.icon}
            />
            <Text style={editable ? styles.simpleText : styles.simpleTextWhite}>
              {detail}
            </Text>
          </View>
        ) : (
          <View />
        )}

        <View style={editable ? styles.dualWrapper : styles.dualWrapperWhite}>
          <Ionicons
            name="time-outline"
            size={18}
            color={editable ? "#ffffff" : "#000000"}
            style={styles.icon}
          />
          <Text style={editable ? styles.simpleText : styles.simpleTextWhite}>
            {innerBreakDuration}
          </Text>
        </View>
      </View>
      {editable ? (
        <TouchableOpacity
          style={styles.removeButton}
          activeOpacity={0.7}
          onPress={onDelete}
        >
          <Ionicons
            name="trash-outline"
            size={18}
            color="#fff"
            style={styles.buttonIcon}
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
    marginBottom: 16,
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
    backgroundColor: "#d33215",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    width: "100%",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
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
