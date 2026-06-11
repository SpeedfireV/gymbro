import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, FlatList } from "react-native";
import NavigationBar from "../../ReusableComponents/NavigationBar";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { Ionicons } from "@expo/vector-icons";
import { TrainingItem } from "../../ReusableComponents/ComplexTypes";
import ShortTrainingTile from "../../ReusableComponents/ShortTrainingTile";
import { TabButton } from "../../ReusableComponents/TabButton";
import NewActivityButton from "../../ReusableComponents/NewActivity";
import { PageTitle } from "../../ReusableComponents/PageTitle";
import ExcercisesSearchBar from "../ExcercisesPages/ExercisesPage/ExercisesPage";
import TrainingsSearchBar from "./components/TrainingsSearchBar";
import { GBSearchBar } from "../../ReusableComponents/GBSearchBar";
import TrainingsCategoryButtons from "./components/TrainingsCategoryButtons";
import TrainingsList from "./components/TrainingsList";

export function TrainingPage({
  navigation,
}: StackScreenProps<RootStackParamList, "Training">) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] =
    useState<keyof RootStackParamList>("Training");
  const [PersonalActive, setPersonalActive] = useState(true);

  const dummyTrainings: TrainingItem[] = [
    {
      id: "1",
      title: "Leg Day",
      description: "NIG",
      muscles: "Leg, Triceps, Biceps",
      time: "14:30-18:50",
      exercisesCount: 8,
      duration: "4 h 20 min",
      exercises: [
        {
          id: "e1",
          name: "Cardio",
          muscle: ["Heart"],
          detail: "45 min",
          order: 1,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: false,
        },
        {
          id: "e2",
          name: "Incline Bench Press",
          muscle: ["Biceps"],
          detail: "4x12",
          order: 2,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: true,
        },
        {
          id: "e3",
          name: "Cardio",
          muscle: ["Heart"],
          detail: "45 min",
          order: 3,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: false,
        },
        {
          id: "e4",
          name: "Incline Bench Press",
          muscle: ["Biceps"],
          detail: "4x12",
          order: 4,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: true,
        },
      ],
      isPublic: true,
    },
    {
      id: "2",
      title: "abscdjk",
      description:
        "aasodsjidajs odjoi asdjioasjd ajosdjioasdji asjidaosjdji aosdjoas jdasjdjaosdjasj dasjdjaosdjioasdjoasjd asjodjoiasdjiasjdja sodjiaosdjoasjdasjdjasdjioasdji oasjdasdjas doasdaasodsjid ajsodjo iasdjioa sjdajosdji oasdj iasjidaosjd jiaosdjoa sjdasjdjaos djasjdasjdjaosdjio asdjoa sjdasj aasodsjidajs odjoi asdjioasjd ajosdjioasdji asjidaosjdji aosdjoas jdasjdjaosdjasj dasjdjaosdjioasdjoasjd asjodjoiasdjiasjdja sodjiaosdjoasjdasjdjasdjioasdji oasjdasdjas doasdaasodsjid ajsodjo iasdjioa sjdajosdji oasdj iasjidaosjd jiaosdjoa sjdasjdjaos djasjdasjdjaosdjio asdjoa sjdasj aasodsjidajs odjoi asdjioasjd ajosdjioasdji asjidaosjdji aosdjoas jdasjdjaosdjasj dasjdjaosdjioasdjoasjd asjodjoiasdjiasjdja sodjiaosdjoasjdasjdjasdjioasdji oasjdasdjas doasdaasodsjid ajsodjo iasdjioa sjdajosdji oasdj iasjidaosjd jiaosdjoa sjdasjdjaos djasjdasjdjaosdjio asdjoa sjdasj ",
      muscles: "Leg, Triceps, Biceps",
      time: "14:30-18:50",
      exercisesCount: 8,
      duration: "4 h 20 min",
      exercises: [
        {
          id: "x1",
          name: "Cardio",
          muscle: ["Heart"],
          detail: "45 min",
          order: 3,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: false,
        },
        {
          id: "x2",
          name: "Incline Bench Press",
          muscle: ["Biceps"],
          detail: "4x12",
          order: 4,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: true,
        },
      ],
      isPublic: true,
    },
    {
      id: "3",
      title: "Leg Day",
      description: "ER",
      muscles: "Leg, Triceps, Biceps",
      time: "14:30-18:50",
      exercisesCount: 8,
      duration: "4 h 20 min",
      exercises: [
        {
          id: "c1",
          name: "Cardio",
          muscle: ["Heart"],
          detail: "45 min",
          order: 3,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: false,
        },
        {
          id: "c2",
          name: "Incline Bench Press",
          muscle: ["Biceps"],
          detail: "4x12",
          order: 4,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: true,
        },
      ],
      isPublic: true,
    },
  ];

  const dummyTrainings2: TrainingItem[] = [
    {
      id: "1",
      title: "Second Day",
      description: "NIG",
      muscles: "Leg, Triceps, Biceps",
      time: "14:30-18:50",
      exercisesCount: 8,
      duration: "4 h 20 min",
      exercises: [
        {
          id: "e1",
          name: "Cardio",
          muscle: ["Heart"],
          detail: "45 min",
          order: 1,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: false,
        },
        {
          id: "e2",
          name: "Incline Bench Press",
          muscle: ["Biceps"],
          detail: "4x12",
          order: 2,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: true,
        },
        {
          id: "e3",
          name: "Cardio",
          muscle: ["Heart"],
          detail: "45 min",
          order: 3,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: false,
        },
        {
          id: "e4",
          name: "Incline Bench Press",
          muscle: ["Biceps"],
          detail: "4x12",
          order: 4,
          type: "exercise",
          innerBreakDuration: "1 min 30 sec",
          isRepeating: true,
        },
      ],
      isPublic: false,
    },
  ];

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
        <TrainingsCategoryButtons
          personalActive={PersonalActive}
          setPersonalActive={setPersonalActive}
        />
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
    backgroundColor: "#000000",
  },
  edditAddContainer: {
    padding: 10,
    flex: 0.15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pageTitleContainer: {
    flex: 0.15,
    padding: 20,
  },
  doubleButtonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
    gap: 10,
  },
  pageTitle: {
    fontSize: 34,
    color: "#FF4500",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#272727",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
});
