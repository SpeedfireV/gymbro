import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { GBSearchBar } from "../../../../ReusableComponents/GBSearchBar";
import EditAddHeader from "../../../../ReusableComponents/EditAddHeader";
import { ExerciseCard } from "../../../../ReusableComponents/ExerciseCard";
import { AddTrainingComponent } from "./AddTrainingComponent";
import {
  ExerciseItem,
  ExercisePrototype,
} from "../../../../ReusableComponents/ComplexTypes";

import {pushUpPrototype, plankPrototype, squatPrototype, bicepCurlPrototype} from "../../TrainingsPage/DummyTrainingsData";


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
    name: "",
    type: "",
    muscule: "",
    difficulty: "",
    instructions: "",
    safety_info: ""
  });

  const EXERCISES = [
    {
      name: "Push-Up",
      type: "reps",
      muscule: "Chest",
      difficulty: "Beginner",
      instructions: "Lower your body until your chest nearly touches the floor, then push back up.",
      safety_info: "Keep your core tight and do not let your lower back sag."
    },
    {
      name: "Plank",
      type: "duration",
      muscule: "Abs",
      difficulty: "Beginner",
      instructions: "Hold a push-up position but rest your weight on your forearms rather than your hands.",
      safety_info: "Keep your body in a straight line from head to heels."
    },
    {
      name: "Bodyweight Squat",
      type: "reps",
      muscule: "Quads",
      difficulty: "Beginner",
      instructions: "Lower your hips until your thighs are parallel to the floor, then stand back up.",
      safety_info: "Keep your knees aligned with your toes and your chest up."
    },
    {
      name: "Dumbbell Bicep Curl",
      type: "reps",
      muscule: "Biceps",
      difficulty: "Beginner",
      instructions: "Curl the weights while contracting your biceps.",
      safety_info: "Do not swing your body to lift the weights."
    },
  ];

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
        <FlatList
          data={EXERCISES}
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
        />
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
