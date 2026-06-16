import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { TrainingItem } from "../../ReusableComponents/ComplexTypes";
import EditAddHeader from "../../ReusableComponents/EditAddHeader";
import TrainingCard from "../TrainingsPages/TrainingsPage/components/TrainingCard";
import { Icon } from "../../../Icons";
import { colors } from "../../../Colors";
import { dummyTrainings } from "../TrainingsPages/TrainingsPage/DummyTrainingsData";
import { GBSearchBar } from "../../ReusableComponents/GBSearchBar";
import { fetchUserEvents } from "./fetchUserEvents"
import TrainingTile from "../../ReusableComponents/TrainingTile";
import { deleteCalendarEvent } from "./removeEvent"

export function ActivitiesInspector({
  navigation,
}: StackScreenProps<RootStackParamList, "ActivitiesInspector">) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
        const loadUserPlans = async () => {
            setIsLoading(true);
            try {
                const events = await fetchUserEvents();

                const mappedTrainings = events
                    .map((event: any) => {
                        const workout = event.workout;
                        
                        const formattedStartTime = event.time_begin 
                            ? event.time_begin.substring(0, 5) 
                            : "Formless";
                        
                        const rawNextOccurrence = event.next_occurrence;
                        let cleanNextEvent = "Never";
                        if (rawNextOccurrence && rawNextOccurrence !== "never") {
                            const datePart = rawNextOccurrence.substring(0, 10);
                            const timePart = rawNextOccurrence.substring(11, 16);
                            
                            cleanNextEvent = `${datePart} ${timePart}`;
                        }

                        return {
                            id: String(event.id),
                            title: workout?.name,
                            description: event.description,
                            muscles: workout?.muscles && workout.muscles.length > 0 
                                ? workout.muscles.map((m: string) => m.charAt(0).toUpperCase() + m.slice(1)).join(", ")
                                : "Overall Development",
                            time: formattedStartTime,
                            exercisesCount: workout?.exercises_count || 0,
                            duration: workout?.total_duration || "00:00:00",
                            exercises: workout?.exercises ? workout.exercises.map((ex: any, idx: number) => ({
                                id: String(ex.index),
                                order: idx + 1,
                                name: ex.exercise?.name || "Exercise",
                                setsAndReps: `${ex.sets}x${ex.reps}`,
                                duration: `${ex.duration.substring(2, 8)}`,
                                type: ex.exercise.type
                            })) : [],
                            dateNextEvent: cleanNextEvent,

                        };
                    });

                setUserEvents(mappedTrainings);
                Alert.alert("GOOD");
            } catch (error) {
                console.error("Error loading day plans:", error);
                Alert.alert("ERROR");
            } finally {
                setIsLoading(false);
            }
        };

        loadUserPlans();
    }, [refreshCounter]);



    const filteredEvents = userEvents.filter((event) => {
        const query = searchQuery.toLowerCase().trim();
        
        if (!query) return true;

        const matchesTitle = event.title?.toLowerCase().includes(query);
        const matchesDescription = event.description?.toLowerCase().includes(query);

        return matchesTitle || matchesDescription;
    });

    const HandleRemoveEvent = async (eventId: string) => {
        if (!eventId) {
            Alert.alert("Error", "Cannot find event ID.");
            return;
        }


        const success = await deleteCalendarEvent(eventId);
                
        if (success) {
            Alert.alert("Success", "Event removed successfully.");
            setRefreshCounter((prev) => prev + 1);
        } else {
            Alert.alert("Error", "Failed to remove the event. Try again.");
        }
    };

    const renderItem = ({ item }: { item: TrainingItem }) => (
        <TrainingTile
        item={item}
        extended={true}
        onDelete={() => {HandleRemoveEvent(item.id);}}
        />
    );

    return (
    <View style={styles.container}>
      <FlatList
        data={filteredEvents}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <EditAddHeader
              title={"INSPECT YOUR EVENTS"}
              onBack={() => navigation.navigate("Home")}
              showDelete={false}
              onDelete={() => {}}
            />
            <GBSearchBar
              placeholderText="Find Event"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </View>
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          marginTop: 24,
          marginHorizontal: 24,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
