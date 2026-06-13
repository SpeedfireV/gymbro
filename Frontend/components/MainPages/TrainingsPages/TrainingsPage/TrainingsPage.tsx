import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import NavigationBar from "../../../ReusableComponents/NavigationBar";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import NewActivityButton from "../../../ReusableComponents/NewActivity";
import { PageTitle } from "../../../ReusableComponents/PageTitle";
import { GBSearchBar } from "../../../ReusableComponents/GBSearchBar";
import TrainingsCategoryButtons from "./components/TrainingsCategoryButtons";
import TrainingsList from "./components/TrainingsList";
import { colors } from "../../../../Colors";
import { dummyTrainings, dummyTrainings2 } from "./DummyTrainingsData";

export function TrainingsPage({
  navigation,
}: StackScreenProps<RootStackParamList, "Training">) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] =
    useState<keyof RootStackParamList>("Training");
  const [PersonalActive, setPersonalActive] = useState(true);

  return (
    <View style={styles.container}>
      <PageTitle title="TRAININGS" />
      <View style={{ marginHorizontal: 24 }}>
        <GBSearchBar
          placeholderText="Find Training"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>
      <View style={styles.content}>
        <View style={{ marginHorizontal: 24 }}>
          <TrainingsCategoryButtons
            personalActive={PersonalActive}
            setPersonalActive={setPersonalActive}
          />
        </View>
        <TrainingsList
          trainings={PersonalActive ? dummyTrainings : dummyTrainings2}
          navigation={navigation}
        />
      </View>
      <NewActivityButton
        Title="ADD NEW TRAINING"
        onPress={() => {
          navigation.navigate("TrainingSelector");
        }}
      />

      <NavigationBar activeTab={activeTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
