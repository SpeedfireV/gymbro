import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../../../../App";
import { StackScreenProps } from "@react-navigation/stack";
import ExerciseTopBar from "../components/ExerciseTopBar";
import ExerciseImageCarousel from "../components/ExerciseImageCarousel";
import ExerciseBodyParts from "../components/ExerciseBodyParts";
import ExerciseDescription from "../components/ExerciseDescription";
import Spacer from "../../../ReusableComponents/Spacer";
import ExerciseBottomBar from "../components/ExerciseBottomBar";
import { ExercisePrototype } from "../../../ReusableComponents/ComplexTypes";

export function ExercisePage({
  navigation,
}: StackScreenProps<RootStackParamList, "Exercise">) {
  const exercise: ExercisePrototype = {
    name: "Pull Ups",
    muscule: "Back",
    instructions: "Pull ups are a great exercise for building upper body strength, particularly targeting the back muscles. To perform a pull up, grip the bar with your hands slightly wider than shoulder-width apart, and pull your body up until your chin is above the bar. Lower yourself back down with control and repeat for the desired number of repetitions.",
    type: "repeating",
    difficulty: "basic",
    safety_info: "none",
  };

  return (
    <View style={styles.container}>
      <ExerciseTopBar exerciseName={exercise.name} />
      <ExerciseImageCarousel />
      <ExerciseBodyParts bodyParts={exercise.muscule} />
      <ExerciseDescription description={exercise.instructions} />
      <Spacer />
      <ExerciseBottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
