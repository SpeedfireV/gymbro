import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TrainingItem } from "../../../../ReusableComponents/ComplexTypes";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";
import TrainingCardHeaderRow from "./TrainingCardHeaderRow";
import TrainingCardDetailsRow from "./TrainingCardDetailsRow";
import TrainingPublicityStatus from "./TrainingPublicityStatus";

interface Props {
  item: TrainingItem;
  description: string;
  showPublicity: boolean;
  onSelect: (item: TrainingItem) => void;
}

const TrainingCard = ({
  item,
  description,
  showPublicity,
  onSelect,
}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(item)}>
      <TrainingCardHeaderRow title={item.title} muscles={item.muscles} />
      <Text style={styles.description}>{description}</Text>
      <TrainingCardDetailsRow
        exercisesCount={item.exercisesCount}
        duration={item.duration}
      />
      <TrainingPublicityStatus isPublic={item.isPublic} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.onSurface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 32,
    boxShadow: `0px 0px 8px ${colors.activeYellow}`,
  },
  description: {
    color: colors.platiniumWhite,
    fontSize: 16,
    fontFamily: fonts.chakraPetchRegular,
    textAlign: "center",
    marginBottom: 16,
  },
});

export default TrainingCard;
