import React, { useState } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { TrainingItem } from "../../ReusableComponents/ComplexTypes";
import EditAddHeader from "../../ReusableComponents/EditAddHeader";
import TrainingCard from "../TrainingsPages/TrainingsPage/components/TrainingCard";
import { Icon } from "../../../Icons";
import { colors } from "../../../Colors";
import { dummyTrainings } from "../TrainingsPages/TrainingsPage/DummyTrainingsData";
import { GBSearchBar } from "../../ReusableComponents/GBSearchBar";

export function TrainingSelector({
  navigation,
}: StackScreenProps<RootStackParamList, "TrainingSelector">) {
  const [searchQuery, setSearchQuery] = useState("");

  const renderItem = ({ item }: { item: TrainingItem }) => (
    <TrainingCard
      item={item}
      description={item.description}
      showPublicity={true}
      onSelect={(training) => navigation.navigate("DateSelector", { training })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyTrainings}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <EditAddHeader
              title={"SELECT TRAINING"}
              onBack={() => navigation.navigate("Home")}
              showDelete={false}
              onDelete={() => {}}
            />
            <GBSearchBar
              placeholderText="Find Training"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </View>
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          marginTop: 24,
          marginHorizontal: 24,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
