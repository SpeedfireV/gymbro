import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../config/api';

export interface CreateCalendarEventPayload {
  workout: number;
  utc_time: string; 
  time_begin: string;
  event_type: string;
  title: string;
  description: string;
  repeat: 'none' | 'daily' | 'weekly' | string;
}

export const createCalendarEvent = async (payload: CreateCalendarEventPayload): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error("Token missing");
      return false;
    }

    const response = await fetch(getApiUrl('/api/calendar-events/'), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("Calendar event created successfully!");
      return true;
    } else {
      const errorData = await response.json();
      console.error("Backend validation error:", errorData);
      return false;
    }
  } catch (error) {
    console.error("Network error while creating calendar event:", error);
    return false;
  }
};