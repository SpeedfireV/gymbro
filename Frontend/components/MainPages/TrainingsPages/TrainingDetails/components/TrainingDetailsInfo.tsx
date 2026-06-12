import { View, Text, StyleSheet } from "react-native";
import React from "react";
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
      <View style={{ gap: 16 }}>
        <TrainingDetailsInfoElem
          icon="sports"
          title="BODY PARTS"
          description={muscles}
        />
        <TrainingDetailsInfoElem
          icon="time"
          title="TOTAL TRAINING TIME"
          description={duration}
        />
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    fontFamily: fonts.chakraPetchRegular,
    color: colors.platiniumWhite,
    fontSize: 16,
    marginTop: 24,
    textAlign: "center",
  },
});
