

export interface ExercisePrototype {
  name: string;
  type : string;
  muscule: string;
  difficulty: string;
  instructions: string;
  safety_info: string;
}

export interface ExerciseItem {
  index: string;
  exercise: ExercisePrototype;
  sets: string;
  reps: string;
  duration: string;
  break_between: string;
  break_after: string;
  order: number;
}

export interface TrainingItem {
  id: string;
  title: string;
  description: string;
  muscles: string;
  time: string;
  exercisesCount: number;
  duration: string;
  exercises: ExerciseItem[];
  isPublic: boolean;
}