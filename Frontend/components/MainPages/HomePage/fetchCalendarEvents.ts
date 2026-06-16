import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../config/api';
import { CalendarEventItem } from '../../ReusableComponents/ComplexTypes';

export const fetchCalendarEvents = async (targetDate: string): Promise<CalendarEventItem[]> => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      console.error("Token missing");
      return [];
    }

    const url = getApiUrl(`/api/calendar-events/?date=${targetDate}`);

    console.log(`Fetching calendar events from: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch calendar events, status:", response.status);
      return [];
    }

    const data = await response.json();
    return data as CalendarEventItem[];

  } catch (error) {
    console.error("Network error while fetching calendar events:", error);
    return [];
  }
};