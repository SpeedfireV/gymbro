import { View, Text, FlatList } from "react-native";
import React from "react";
import { TrainingItem } from "../../../ReusableComponents/ComplexTypes";
import ShortTrainingTile from "../../../ReusableComponents/ShortTrainingTile";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

interface TrainingsListData {
  trainings: Array<TrainingItem>;
  navigation: any;
}

export default function TrainingsList({
  trainings,
  navigation,
}: TrainingsListData) {
  const renderItem = ({ item }: { item: TrainingItem }) => (
    <ShortTrainingTile
      item={item}
      description={item.description}
      showPublicity={false}
      onSelect={(training) =>
        navigation.navigate("TrainingDetail", { training })
      }
    />
  );
  return (
    <FlatList
      data={trainings}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      style={{ flex: 1 }}
    />
  );
}
