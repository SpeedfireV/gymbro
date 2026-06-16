import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../config/api';
import { CalendarEventItem } from '../../ReusableComponents/ComplexTypes';

export interface CalendarOverviewItem {
  id: number;
  title: string;
  description: string;
  repeat: string;
  repeat_interval: number;
  next_occurrence: string;
  time_begin: string;
  workout?: any;
}

export const fetchUserEvents = async (): Promise<CalendarOverviewItem[]> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) return [];

    const url = getApiUrl('/api/calendar-events/overview/');
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) return [];

    return await response.json() as CalendarOverviewItem[];
  } catch (error) {
    console.error("Error fetching overview:", error);
    return [];
  }
};