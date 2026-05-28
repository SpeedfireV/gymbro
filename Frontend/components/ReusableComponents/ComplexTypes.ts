export interface Exercise {
  id: string;
  name: string;
  type: string;
  muscle: string;
  detail: string;
  difficulty?: string;
  instructions?: string;
  safetyInfo?: string;
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
  exercises: Exercise[];
  isPublic: boolean;
}