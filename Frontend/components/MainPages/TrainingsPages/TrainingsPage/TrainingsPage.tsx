import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
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
import { fetchUserWorkouts } from "./FetchWorkouts";

export function TrainingsPage({
  navigation,
}: StackScreenProps<RootStackParamList, "Training">) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] =
    useState<keyof RootStackParamList>("Training");
  const [PersonalActive, setPersonalActive] = useState(true);
  const [realTrainings, setRealTrainings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      setIsLoading(true);
      const workouts = await fetchUserWorkouts();
      setRealTrainings(workouts);
      setIsLoading(false);
    };

    loadWorkouts();
  }, []);

  const newTraining = {
      id: "nt",
      title: "New AWESOME Training",
      description: "",
      muscles: "",
      time: "00:00",
      exercisesCount: 0,
      duration: "",
      isPublic: false,
      exercises: []
    }

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
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#00ff00" /> 
            <Text style={styles.infoText}>Loading your workouts...</Text>
          </View>
        ) : PersonalActive && realTrainings.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.infoText}>No personal workouts found.</Text>
            <Text style={styles.subInfoText}>Tap below to create your first routine!</Text>
          </View>
        ) : (
          <TrainingsList
            trainings={PersonalActive ? realTrainings : dummyTrainings2}
            navigation={navigation}
          />
        )}
      </View>
      <NewActivityButton
        Title="ADD NEW TRAINING"
        onPress={() => {
          navigation.navigate("NewTrainingDetail", { training: newTraining });
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
  centerContainer: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  infoText: { 
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600"
  },
  subInfoText: { 
    color: "#aaa",
    fontSize: 14,
    marginTop: 5
  }
});
