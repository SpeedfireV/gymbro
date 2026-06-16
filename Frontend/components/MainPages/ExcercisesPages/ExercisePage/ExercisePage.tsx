import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../../../../App";
import { StackScreenProps } from "@react-navigation/stack";
import ExerciseTopBar from "../components/ExerciseTopBar";
import ExerciseImageCarousel from "../components/ExerciseImageCarousel";
import ExerciseBodyParts from "../components/ExerciseBodyParts";
import ExerciseDescription from "../components/ExerciseDescription";
import Spacer from "../../../ReusableComponents/Spacer";
import ExerciseBottomBar from "../components/ExerciseBottomBar";
import ExerciseDescriptionHeader from "../components/ExerciseDescriptionHeader"
import { ExercisePrototype } from "../../../ReusableComponents/ComplexTypes";

export function ExercisePage({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "Exercise">) {
  
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <ExerciseTopBar exerciseName={exercise.name} />
      <ExerciseImageCarousel />
      <ExerciseBodyParts bodyParts={exercise.muscule} />
      <ExerciseDescriptionHeader title = "INSTRUCTION"/>
      <ExerciseDescription description={exercise.instructions} />
      <ExerciseDescriptionHeader title = "SAFETY INFO"/>
      <ExerciseDescription description={exercise.safety_info} />
      <ExerciseDescriptionHeader title = "DIFICULTY"/>
      <ExerciseDescription description={exercise.difficulty} />
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
