import React, { useState } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { TrainingItem } from "../../ReusableComponents/ComplexTypes";
import EditAddHeader from "../../ReusableComponents/EditAddHeader";
import TrainingCard from "../TrainingsPages/TrainingsPage/components/TrainingCard";

export function TrainingSelector({
  navigation,
}: StackScreenProps<RootStackParamList, "TrainingSelector">) {
  const [searchQuery, setSearchQuery] = useState("");

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
        "aasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdaasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdjoaasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdjosajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdabaasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdjosajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdabaasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdjosajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdabsajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdabjosajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdab",
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
          muscle: ["Biceps"],
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

  const dummyTrainingsEmpty: TrainingItem[] = [];

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
      <View style={styles.edditAddContainer}>
        <EditAddHeader
          title={"SELECT TRAINING"}
          onBack={() => navigation.navigate("Home")}
          showDelete={false}
          onDelete={() => {}}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Find Training"
            placeholderTextColor="#747373"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons
            name="search-outline"
            size={24}
            color="#FFF"
            style={styles.searchIcon}
          />
        </View>
        <FlatList
          data={dummyTrainings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 10,
  },
  edditAddContainer: {
    padding: 10,
    flex: 0.15,
  },
  content: {
    flex: 0.9,
    paddingHorizontal: 20,
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
