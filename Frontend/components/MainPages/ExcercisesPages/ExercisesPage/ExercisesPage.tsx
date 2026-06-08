import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import NavigationBar from "../../../ReusableComponents/NavigationBar";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import NewActivityButton from "../../../ReusableComponents/NewActivity";
import { TabButton } from "../../../ReusableComponents/TabButton";
import { ExerciseCard } from "../../../ReusableComponents/ExerciseCard";
import { PageTitle } from "../../../ReusableComponents/PageTitle";
import { GBSearchBar } from "../../../ReusableComponents/GBSearchBar";

export function ExercisesPage({
  navigation,
}: StackScreenProps<RootStackParamList, "Exercises">) {
  const [activeTab] = useState<keyof RootStackParamList>("Exercises");
  const [PersonalActive, setPersonalActive] = useState(true);

  const EXERCISES = [
    {
      title: "Pull Ups",
      bodyParts: ["Triceps"],
      desc: "Pull ups are one of the most effective training techniques that enchance...",
      isPublic: false,
    },
    {
      title: "Pull Ups",
      bodyParts: ["Triceps"],
      desc: "Pull ups are one of the most effective training techniques that enchance...",
      isPublic: false,
    },
    {
      title: "Pull Ups",
      bodyParts: ["Triceps"],
      desc: "Pull ups are one of the most effective training techniques that enchance...",
      isPublic: false,
    },
    {
      title: "Pull Ups",
      bodyParts: ["Triceps"],
      desc: "Pull ups are one of the most effective training techniques that enchance...",
      isPublic: false,
    },
    {
      title: "Pull Ups",
      bodyParts: ["Triceps"],
      desc: "Pull ups are one of the most effective training techniques that enchance...",
      isPublic: true,
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.container}>
      <PageTitle title="EXERCISES" />
      <View style={{ paddingHorizontal: 20 }}>
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
          data={EXERCISES}
          contentContainerStyle={{ paddingBottom: 100 }}
          ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 20 }}>
              <ExerciseCard
                title={item.title}
                bodyParts={item.bodyParts}
                desc={item.desc}
                isPublic={item.isPublic}
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
          navigation.navigate("TrainingSelector");
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
    backgroundColor: "#000000",
  },
  doubleButtonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 20,
    width: "100%",
    gap: 10,
  },
  headerText: {
    fontSize: 28,
    color: "#FF4500",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 20,
  },
});
