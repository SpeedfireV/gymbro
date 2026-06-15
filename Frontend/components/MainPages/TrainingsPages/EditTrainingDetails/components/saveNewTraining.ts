import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../../../config/api';
import { ExerciseItem } from '../../../../ReusableComponents/ComplexTypes'

const convertToDjangoDuration = (timeStr: string): string => {
  if (!timeStr) return "00:00:00";

  const minutesMatch = timeStr.match(/(\d+)\s*MIN/i);
  const secondsMatch = timeStr.match(/(\d+)\s*SEC/i);

  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  const seconds = secondsMatch ? parseInt(secondsMatch[1], 10) : 0;

  let totalSeconds = seconds;
  let totalMinutes = minutes;
  let totalHours = 0;

  if (totalSeconds >= 60) {
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
  }

  if (totalMinutes >= 60) {
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
  }

  const pad = (num: number) => String(num).padStart(2, '0');

  return `${pad(totalHours)}:${pad(totalMinutes)}:${pad(totalSeconds)}`;
};

export const saveFullTraining = async (exercises: ExerciseItem[]): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');

    if (!token || !userId) {
      console.error("Token missing");
      return false;
    }

    console.log("Creating new training begin");
    const workoutResponse = await fetch(getApiUrl('/api/workouts/'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: parseInt(userId),               
        created_at: new Date().toISOString()
      }),
    });

    if (!workoutResponse.ok) {
      const errorData = await workoutResponse.json().catch(() => ({}));
      console.error("Training creation error:", workoutResponse.status, errorData);
      return false;
    }

    const createdWorkout = await workoutResponse.json();
    const newWorkoutId = createdWorkout.id;
    console.log(`Sukces! New workout created: ${newWorkoutId}`);

    // --- ETAP 2: Dodawanie ćwiczeń w pętli (Dzieci) ---
    console.log("Etap 2: Adding new exercises to training...");
    
    let indexCounter = 0;
    for (const item of exercises) {
        const formattedDuration = convertToDjangoDuration(item.duration);
        const formattedBreakBetween = convertToDjangoDuration(item.break_between);
        const formattedBreakAfter = convertToDjangoDuration(item.break_after);
        const exercisePayload = {
            workout: newWorkoutId,
            exercise: item.exercise.id,
            index: indexCounter,
            sets: item.sets,
            reps: item.reps,
            duration: formattedDuration,
            break_between: formattedBreakBetween,
            break_after: formattedBreakAfter
        };
        console.log(`duration: ${formattedDuration}`);
        console.log(`break_between: ${formattedBreakBetween}`);
        console.log(`break_after: ${formattedBreakAfter}`);
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
            console.error(`Error in adding exercise: ${indexCounter}:`, errorData);
        } else {
            console.log(`Added exercise: [Indeks: ${indexCounter}]`);
        }

        indexCounter++;
        }
        return true;
    } catch (error) {
        console.error("Błąd sieciowy podczas zapisu całego treningu:", error);
        return false;
    }
};