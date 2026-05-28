export interface Exercise {
  id: string;
  name: string;
  muscule: string;
  detail: string;
  type: string;
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