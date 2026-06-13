import { FlatList } from "react-native";
import React from "react";
import { TrainingItem } from "../../../../ReusableComponents/ComplexTypes";
import TrainingCard from "./TrainingCard";

interface TrainingsListData {
  trainings: Array<TrainingItem>;
  navigation: any;
}

export default function TrainingsList({
  trainings,
  navigation,
}: TrainingsListData) {
  const renderItem = ({ item }: { item: TrainingItem }) => (
    <TrainingCard
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
      contentContainerStyle={{
        paddingBottom: 64,
        paddingTop: 16,
        marginHorizontal: 24,
      }}
      style={{ flex: 1 }}
    />
  );
}
