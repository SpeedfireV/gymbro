import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../../config/api';

export const deleteUserWorkout = async (workoutId: string): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    
    if (!token) {
      console.error("No Token");
      return false;
    }

    const response = await fetch(getApiUrl(`/api/workouts/${workoutId}/`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      console.log(`Workout ${workoutId} deleted successfully.`);
      return true;
    } else {
      console.error("Delete error status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Network Error during delete:", error);
    return false;
  }
};