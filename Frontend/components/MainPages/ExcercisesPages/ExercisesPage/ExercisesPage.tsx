import React, { useState, useEffect} from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import NavigationBar from "../../../ReusableComponents/NavigationBar";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import NewActivityButton from "../../../ReusableComponents/NewActivity";
import { TabButton } from "../../../ReusableComponents/TabButton";
import { ExerciseCard } from "../../../ReusableComponents/ExerciseCard";
import { PageTitle } from "../../../ReusableComponents/PageTitle";
import { GBSearchBar } from "../../../ReusableComponents/GBSearchBar";
import { colors } from "../../../../Colors";
import {ExercisePrototype} from "../../../ReusableComponents/ComplexTypes";
import { fetchExercisesDictionary } from "../../../ReusableComponents/getExercises";

export function ExercisesPage({
  navigation,
}: StackScreenProps<RootStackParamList, "Exercises">) {
  const [activeTab] = useState<keyof RootStackParamList>("Exercises");
  const [PersonalActive, setPersonalActive] = useState(true);
  const [exercisesDictionary, setExercisesDictionary] = useState<ExercisePrototype[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const loadExercises = async () => {
        setIsLoading(true);
        const data = await fetchExercisesDictionary();
        setExercisesDictionary(data);
        setIsLoading(false);
      };
      loadExercises();
  }, []);

  const filteredExercises = exercisesDictionary.filter((exercise) => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return true;

    const matchesTitle = exercise.name.toLowerCase().includes(query);
    const matchesDescription = exercise.instructions.toLowerCase().includes(query);
    const matchesMuscles = exercise.muscule.toLowerCase().includes(query);

    return matchesTitle || matchesDescription || matchesMuscles;
  });

  return (
    <View style={styles.container}>
      <PageTitle title="EXERCISES" />
      <View style={{ paddingHorizontal: 24 }}>
        <GBSearchBar
          placeholderText="Find Exercise"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>
      <View style={styles.doubleButtonContainer}>
        <TabButton
          title={"PERSONAL"}
          enabled={PersonalActive}
          onSelect={() => setPersonalActive(true)}
        ></TabButton>
        <TabButton
          title={"BRO SCIENCE"}
          enabled={!PersonalActive}
          onSelect={() => setPersonalActive(false)}
        ></TabButton>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredExercises}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 24 }}>
              <ExerciseCard
                title={item.name}
                bodyParts={item.muscule}
                desc={item.instructions}
                showIcon={true}
                onPress={() => {
                  navigation.navigate("Exercise");
                }}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <NewActivityButton
        Title="ADD NEW EXERCISE"
        onPress={() => {
          navigation.navigate("AddNewExercise");
        }}
      ></NewActivityButton>

      <NavigationBar activeTab={activeTab} />
    </View>
  );
}

export default function ExcercisesSearchBar() {
  return (
    <View>
      <Text>Find Training</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  doubleButtonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 24,
    width: "100%",
    gap: 10,
  },
  headerText: {
    fontSize: 28,
    color: colors.fireRed,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 20,
  },
});
