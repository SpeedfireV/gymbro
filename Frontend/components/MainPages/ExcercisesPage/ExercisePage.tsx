import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../../../App";
import { StackScreenProps } from "@react-navigation/stack";
import ExerciseTopBar from "./components/ExcerciseTopBar";
import ExerciseImageCarousel from "./components/ExerciseImageCarousel";
import ExerciseBodyParts from "./components/ExerciseBodyParts";
import ExerciseDescription from "./components/ExerciseDescription";
import Spacer from "../../ReusableComponents/Spacer";
import ExerciseBottomBar from "./components/ExerciseBottomBar";
import { Exercise } from "../../ReusableComponents/ComplexTypes";
import { ExerciseStylesProvider, styles } from './components/ExerciseStyles'



export function ExercisePage({ navigation }: StackScreenProps<RootStackParamList, 'Exercise'>) {

  const exercise: Exercise = 
    {
      id: 'e1',
      name: 'Pull Ups',
      muscle: "Back",
      detail: '4x12',
      order: 1,
      type: "excercise",
      instructions: 'Pull ups are a great exercise for building upper body strength, particularly targeting the back muscles. To perform a pull up, grip the bar with your hands slightly wider than shoulder-width apart, and pull your body up until your chin is above the bar. Lower yourself back down with control and repeat for the desired number of repetitions.',
    }
  
  return (
    <ExerciseStylesProvider>
      <View style={styles.container}>
        <ExerciseTopBar exerciseName={exercise.name} />
        <ExerciseImageCarousel />
        <ExerciseBodyParts bodyParts={exercise.muscle} />
        <ExerciseDescription description={exercise.instructions} />
        <Spacer />
        <ExerciseBottomBar />
      </View >
    </ExerciseStylesProvider>
  )
}

