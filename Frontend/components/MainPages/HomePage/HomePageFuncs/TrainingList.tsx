
import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import TrainingTile from '../../../ReusableComponents/TrainingTile'
import { TrainingItem } from '../../../ReusableComponents/ComplexTypes'
import { Ionicons } from '@expo/vector-icons';
import { fetchCalendarEvents } from '../fetchCalendarEvents'

const TrainingsList = ({ selectedDate }: { selectedDate: Date }) => {
    const [dayEvents, setDayEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const renderTrainingCard = ({ item }: { item: any }) => (
        <TrainingTile item={item} />
    );

    useEffect(() => {
        const loadDayPlans = async () => {
            setIsLoading(true);
            try {
                const start = new Date(selectedDate);
                start.setHours(0, 0, 0, 0);
                
                const end = new Date(selectedDate);
                end.setHours(23, 59, 59, 999);

                const events = await fetchCalendarEvents(start.toISOString(), end.toISOString());

                
                
                const mappedTrainings = events
                    .filter(event => event.event_type === "workout" && event.workout)
                    .map((event: any) => {
                        const workout = event.workout;

                        const formattedStartTime = event.time_begin 
                            ? event.time_begin.substring(0, 5) 
                            : "Formless";
                        return {
                            id: String(event.id),
                            title: workout?.name,
                            description: "",
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
                                duration: `${ex.duration}`,
                                type: ex.exercise.type
                            })) : []
                        };
                    });

                setDayEvents(mappedTrainings);
            } catch (error) {
                console.error("Error loading day plans:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDayPlans();
    }, [selectedDate]);

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <Text style={styles.sectionTitle}>TRAININGS PLANNED</Text>
                }
                data={dayEvents}
                renderItem={renderTrainingCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Ionicons name="calendar-outline" size={80} color="#333" />
                    <Text style={styles.emptyText}>No trainings planned for today.</Text>
                    <Text style={styles.emptySubText}>Have a nice rest!</Text>
                </View>
            }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    sectionTitle: {
        marginTop: 20,
        color: '#FF4500',
        fontSize: 32,
        marginBottom: 30,
        fontFamily:  'BigShoulders',
        fontWeight: '900',
        
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        paddingHorizontal: 20,
    },
    emptyText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center',
    },
    emptySubText: {
        color: '#888',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
});

export default TrainingsList;