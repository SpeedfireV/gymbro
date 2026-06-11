import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";
import TrainingDetailsInfoElem from "./TrainingDetailsInfoElem";

interface TrainingDetailsInfoData {
  muscles: string;
  duration: string;
  description: string;
}

export default function TrainingDetailsInfo({
  muscles,
  duration,
  description,
}: TrainingDetailsInfoData) {
  return (
    <View>
      <View style={styles.contentMiddle}>
        <TrainingDetailsInfoElem
          icon="sports"
          title="BODY PARTS"
          description={muscles}
        />
        <TrainingDetailsInfoElem
          icon="time"
          title="TOTAL TRAINING TIME"
          description={description}
        />
      </View>
      <View style={styles.contentLower}>
        <View style={styles.midTextWraper}>
          <Text style={styles.midText}>{description}</Text>
        </View>

        <Text style={styles.title}>EXERCISES</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentUpper: {
    padding: 20,
    marginBottom: 20,
  },
  contentMiddle: {
    padding: 20,
    alignItems: "flex-start",
    gap: 20,
  },
  contentLower: {
    padding: 20,
  },
  infoFrame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  descTitle: {
    color: colors.platiniumWhite,
    fontFamily: fonts.chakraPetchBold,
    fontSize: 20,
  },
  descText: {
    color: colors.platiniumWhite,
    fontFamily: fonts.chakraPetchMedium,
    fontSize: 16,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  midTextWraper: {
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",

    marginHorizontal: 10,
  },
  midText: {
    marginTop: 18,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20,
  },
  title: {
    marginTop: 20,
    color: "#FF4500",
    fontSize: 32,
    marginBottom: 30,
    fontWeight: "600",
  },

  dualButtonContainer: {
    position: "absolute",
    bottom: 25,
    left: "5%",
    right: "5%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  BroScienceContainer: {
    flex: 1,
  },
  endingMargin: {
    marginBottom: 100,
  },
});
