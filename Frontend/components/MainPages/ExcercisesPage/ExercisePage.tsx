import { View, StyleSheet } from "react-native";
import { RootStackParamList } from "../../../App";
import { StackScreenProps } from "@react-navigation/stack";
import ExerciseTopBar from "./components/ExerciseTopBar";
import ExerciseImageCarousel from "./components/ExerciseImageCarousel";
import ExerciseBodyParts from "./components/ExerciseBodyParts";
import ExerciseDescription from "./components/ExerciseDescription";
import Spacer from "../../ReusableComponents/Spacer";
import ExerciseBottomBar from "./components/ExerciseBottomBar";
import { ExerciseItem } from "../../ReusableComponents/ComplexTypes";


export function ExercisePage({ navigation }: StackScreenProps<RootStackParamList, 'Exercise'>) {

  const exercise: ExerciseItem = 
    {
      id: 'e1',
      name: 'Pull Ups',
      muscle: "Back",
      detail: '4x12',
      order: 1,
      type: "exercise",
      instructions: 'Pull ups are a great exercise for building upper body strength, particularly targeting the back muscles. To perform a pull up, grip the bar with your hands slightly wider than shoulder-width apart, and pull your body up until your chin is above the bar. Lower yourself back down with control and repeat for the desired number of repetitions.',
    }
  
  return (
    <View style={styles.container}>
      <ExerciseTopBar exerciseName={exercise.name} />
      <ExerciseImageCarousel />
      <ExerciseBodyParts bodyParts={exercise.muscle} />
      <ExerciseDescription description={exercise.instructions} />
      <Spacer />
      <ExerciseBottomBar />
    </View >
  )
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 48,
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  exerciseTitle: {
    fontFamily: 'BigShoulders-ExtraBold',
    fontSize: 36,
    color: '#FFFFFF',
    marginLeft: 16,
  },
  imageRow: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 24,
  },
  metaLeft: {
    flexDirection: 'row',
  },
  metaIcon: {
    marginRight: 16,
  },
  metaLabel: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  metaValue: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  description: {
    fontFamily: 'ChakraPetch-Regular',
    fontSize: 16,
    color: '#EFF1F3',
    textAlign: 'center',
    marginHorizontal: 24,
  },
  spacer: {
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignContent: 'center',
    alignItems: 'center',
    height: 64,
    marginBottom: 32,
    marginHorizontal: 24,
  },


}

);
