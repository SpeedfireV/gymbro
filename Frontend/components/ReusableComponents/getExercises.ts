import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../config/api'; 
import { ExercisePrototype } from './ComplexTypes';

export const fetchExercisesDictionary = async (): Promise<ExercisePrototype[]> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) return [];

    const response = await fetch(getApiUrl('/api/exercises/'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        muscule: item.muscle,
        difficulty: item.difficulty,
        instructions: item.instructions,
        safety_info: item.safety_info,
      }));
    }
    
    console.error("Dict Error:", response.status);
    return [];
  } catch (error) {
    console.error("Network Error: ", error);
    return [];
  }
};