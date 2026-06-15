import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { GBSearchBar } from "../../../../ReusableComponents/GBSearchBar";
import EditAddHeader from "../../../../ReusableComponents/EditAddHeader";
import { ExerciseCard } from "../../../../ReusableComponents/ExerciseCard";
import { AddTrainingComponent } from "./AddTrainingComponent";
import {
  ExerciseItem,
  ExercisePrototype,
} from "../../../../ReusableComponents/ComplexTypes";
import { fetchExercisesDictionary } from "./getExercises";

interface AddExerciseToTrainingPageProps {
  nextTempId: number;
  exercisesList: ExerciseItem[];
  setExercisesList: React.Dispatch<React.SetStateAction<ExerciseItem[]>>;
  setNextTempId: React.Dispatch<React.SetStateAction<number>>;
  onBack: () => void;
}

export function AddExerciseToTrainingPage({
  nextTempId,
  setExercisesList,
  setNextTempId,
  exercisesList,
  onBack,
}: AddExerciseToTrainingPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddExerciseVisable, setIsAddExerciseVisable] = useState(false);
  const [chosenExercise, setChosenExercise] = useState<ExercisePrototype>({
    id: -1,
    name: "",
    type: "",
    muscule: "",
    difficulty: "",
    instructions: "",
    safety_info: ""
  });

  const [exercisesDictionary, setExercisesDictionary] = useState<ExercisePrototype[]>([]);
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

  const handleAddExercise = (
    sets: number,
    reps: number,
    minutes: number,
    seconds: number,
  ) => {
    const totalDurationString =
      `${minutes} MIN ${seconds > 0 ? seconds + " SEC" : ""}`.trim();

    const newExerciseItem: ExerciseItem = {
      index: nextTempId.toString(),
      exercise: chosenExercise,
      sets: String(sets),
      reps: String(reps),
      duration: totalDurationString,
      break_between: totalDurationString,
      break_after: "00:00",
      order: exercisesList.length + 1
    };

    setNextTempId(nextTempId + 1);

    console.log(nextTempId);

    setExercisesList([...exercisesList, newExerciseItem]);
    onBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentUpper}>
        <EditAddHeader
          title="ADD EXERCISE"
          onBack={onBack}
          showDelete={false}
        />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <GBSearchBar
          placeholderText="Find Exercise"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        ) : (
        <FlatList
          data={filteredExercises}
          contentContainerStyle={{ paddingBottom: 100, marginTop: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 20 }}>
              <ExerciseCard
                title={item.name}
                bodyParts={item.muscule}
                desc={item.instructions}
                showIcon={false}
                onPress={() => {
                  setChosenExercise({
                    id: item.id,
                    name: item.name,
                    instructions: item.instructions,
                    muscule: item.muscule,
                    type: item.type,
                    difficulty: item.difficulty,
                    safety_info: item.safety_info
                  });
                  setIsAddExerciseVisable(true);
                }}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />)}
      </View>

      <AddTrainingComponent
        visible={isAddExerciseVisable}
        isExercise={true}
        isRepeating={chosenExercise.type == "reps"}
        onClose={() => setIsAddExerciseVisable(false)}
        onAddExercise={handleAddExercise}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentUpper: {
    padding: 20,
    marginBottom: 20,
  },
});
