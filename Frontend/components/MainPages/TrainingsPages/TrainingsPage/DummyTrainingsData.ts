import { TrainingItem } from "../../../ReusableComponents/ComplexTypes";
import { ExercisePrototype } from "../../../ReusableComponents/ComplexTypes";


export const pushUpPrototype: ExercisePrototype = {
  name: "Push-Up",
  type: "reps",
  muscule: "Chest",
  difficulty: "Beginner",
  instructions: "Lower your body until your chest nearly touches the floor, then push back up.",
  safety_info: "Keep your core tight and do not let your lower back sag."
};

export const plankPrototype: ExercisePrototype = {
  name: "Plank",
  type: "duration",
  muscule: "Abs",
  difficulty: "Beginner",
  instructions: "Hold a push-up position but rest your weight on your forearms rather than your hands.",
  safety_info: "Keep your body in a straight line from head to heels."
};

export const squatPrototype: ExercisePrototype = {
  name: "Bodyweight Squat",
  type: "reps",
  muscule: "Quads",
  difficulty: "Beginner",
  instructions: "Lower your hips until your thighs are parallel to the floor, then stand back up.",
  safety_info: "Keep your knees aligned with your toes and your chest up."
};

export const bicepCurlPrototype: ExercisePrototype = {
  name: "Dumbbell Bicep Curl",
  type: "reps",
  muscule: "Biceps",
  difficulty: "Beginner",
  instructions: "Curl the weights while contracting your biceps.",
  safety_info: "Do not swing your body to lift the weights."
};

export const dummyTrainings: TrainingItem[] = [
  {
    id: "t1",
    title: "Full Body Starter",
    description: "A quick full body workout mixing repetitions and timed holds.",
    muscles: "Chest, Abs, Quads",
    time: "15:00",
    exercisesCount: 3,
    duration: "15:00",
    isPublic: true,
    exercises: [
      {
        index: "e1_1",
        exercise: pushUpPrototype,
        sets: "3",
        reps: "12",
        duration: "00:00",
        break_between: "00:45",
        break_after: "01:00",
        order: 1
      },
      {
        index: "e1_2",
        exercise: plankPrototype,
        sets: "0",
        reps: "0",
        duration: "01:00",
        break_between: "00:30",
        break_after: "00:00",
        order: 2
      },
      {
        index: "e1_3",
        exercise: squatPrototype,
        sets: "3",
        reps: "15",
        duration: "00:00",
        break_between: "00:45",
        break_after: "02:00",
        order: 3
      }
    ]
  }
];

export const dummyTrainings2: TrainingItem[] = [
  {
    id: "t2",
    title: "Upper Body Express",
    description: "Focused training targeting upper body strength.",
    muscles: "Chest, Biceps",
    time: "10:00",
    exercisesCount: 2,
    duration: "10:00",
    isPublic: false,
    exercises: [
      {
        index: "e2_1",
        exercise: pushUpPrototype,
        sets: "4",
        reps: "15",
        duration: "00:00",
        break_between: "01:00",
        break_after: "01:30",
        order: 1
      },
      {
        index: "e2_2",
        exercise: bicepCurlPrototype,
        sets: "3",
        reps: "10",
        duration: "00:00",
        break_between: "00:45",
        break_after: "01:30",
        order: 2
      }
    ]
  }
];