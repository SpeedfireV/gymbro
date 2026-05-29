export interface ExerciseItem {
  id: string;
  name: string;
  type: string;
  muscle: string[];
  detail: string;
  difficulty?: string;
  instructions?: string;
  safetyInfo?: string;
  order: number;
  innerBreakDuration: string;
  isRepeating? : boolean;
}

export interface ExercisePrototype {
  title: string;
  bodyParts: string[];
  desc: string;
  isPublic: boolean
  isRepeating : boolean;
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