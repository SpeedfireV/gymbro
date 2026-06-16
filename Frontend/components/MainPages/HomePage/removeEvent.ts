import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../../config/api';

export const deleteCalendarEvent = async (eventId: string | number): Promise<boolean> => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) return false;

        const cleanId = String(eventId).split('-')[0];

        const url = getApiUrl(`/api/calendar-events/${cleanId}/`);
        console.log(`Sending DELETE request to: ${url}`);

        const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });

        if (response.status === 204 || response.ok) {
        return true;
        }

        console.error("Failed to delete event, status:", response.status);
        return false;
    } catch (error) {
        console.error("Network error while deleting calendar event:", error);
        return false;
    }
};