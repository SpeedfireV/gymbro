import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../../config/api';

export const fetchUserWorkouts = async (): Promise<any[]> => {
  try {
    
    const token = await AsyncStorage.getItem('userToken');
    console.log("TOKEN:", token);

    const userId = (await AsyncStorage.getItem('userId')) || '1'; 

    if (!token) {
      console.error("No Token");
      return [];
    }

    const response = await fetch(getApiUrl(`/api/users/${userId}/workouts/`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Training Fetch error:", response.status);
      const errorData = await response.json().catch(() => ({}));
      console.log("LOG ERROR:", errorData);
      return [];
    }
  } catch (error) {
    console.error("Network Error:", error);
    return [];
  }
};