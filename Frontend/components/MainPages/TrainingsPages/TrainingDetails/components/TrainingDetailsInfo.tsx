import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";
import TrainingDetailsInfoElem from "./TrainingDetailsInfoElem";

interface TrainingDetailsInfoData {
  muscles: string;
  duration: string;
}

export default function TrainingDetailsInfo({
  muscles,
  duration,
}: TrainingDetailsInfoData) {
  return (
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
  );
}
