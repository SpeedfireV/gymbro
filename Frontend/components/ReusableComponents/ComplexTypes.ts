export interface Exercise {
  id: string;
  name: string;
  detail: string;
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
}