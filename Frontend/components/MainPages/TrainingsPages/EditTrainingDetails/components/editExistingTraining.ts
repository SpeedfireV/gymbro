import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../../../config/api';
import { ExerciseItem } from '../../../../ReusableComponents/ComplexTypes'
import { convertToDjangoDuration } from './saveNewTraining'

export const updateFullTraining = async (
  workoutId: string, 
  name: string, 
  description: string, 
  exercises: ExerciseItem[]
): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');

    if (!token || !userId) {
      console.error("Token missing");
      return false;
    }

    console.log(`Updating existing training begin. ID: ${workoutId}. Phase 1 begins`);
    
    const workoutResponse = await fetch(getApiUrl(`/api/workouts/${workoutId}/`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: parseInt(userId),              
        name: name || "New Training",
        description: description || ""
      }),
    });

    if (!workoutResponse.ok) {
      const errorData = await workoutResponse.json().catch(() => ({}));
      console.error("Training update error:", workoutResponse.status, errorData);
      return false;
    }

    console.log("Succes of phase 1!");

    console.log("Etap 2: Adding new exercises to training...");
    
    let indexCounter = 0;
    for (const item of exercises) {
      const formattedDuration = convertToDjangoDuration(item.duration);
      const formattedBreakBetween = convertToDjangoDuration(item.break_between);
      const formattedBreakAfter = convertToDjangoDuration(item.break_after);
      
      const exercisePayload = {
        workout: parseInt(workoutId),
        exercise: item.exercise.id,
        index: indexCounter,
        sets: parseInt(item.sets),
        reps: parseInt(item.reps),
        duration: formattedDuration,
        break_between: formattedBreakBetween,
        break_after: formattedBreakAfter
      };

      const exerciseResponse = await fetch(getApiUrl('/api/workout-exercises/'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(exercisePayload),
      });

      if (!exerciseResponse.ok) {
        const errorData = await exerciseResponse.json().catch(() => ({}));
        console.error(`Error in adding exercise at index ${indexCounter}:`, errorData);
      } else {
        console.log(`Added exercise: [Indeks: ${indexCounter}]`);
      }

      indexCounter++;
    }
    
    return true;
  } catch (error) {
    console.error("Błąd sieciowy podczas edycji całego treningu:", error);
    return false;
  }
};