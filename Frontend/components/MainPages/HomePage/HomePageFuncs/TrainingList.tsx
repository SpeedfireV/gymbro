
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import TrainingTile from '../../../ReusableComponents/TrainingTile'
import { TrainingItem } from '../../../ReusableComponents/ComplexTypes'
import { Ionicons } from '@expo/vector-icons';

const TrainingsList = ({ selectedDate }: { selectedDate: Date }) => {
    const dummyTrainings : TrainingItem[] = [
        {
        id: '1',
        title: 'Leg Day',
        description : '',
        muscles: 'Leg, Triceps, Biceps',
        time: '14:30-18:50',
        exercisesCount: 8,
        duration: '4 h 20 min',
        exercises: [
            { id: 'e1', name: 'Cardio', detail: '45 min', order: 1 },
            { id: 'e2', name: 'Incline Bench Press', detail: '4x12', order: 2 },
            { id: 'e3', name: 'Cardio', detail: '45 min', order: 3 },
            { id: 'e4', name: 'Incline Bench Press', detail: '4x12', order: 4 },
        ]
        },
        {
        id: '2',
        title: 'abscdefghijk',
        description : '',
        muscles: 'Leg, Triceps, Biceps',
        time: '14:30-18:50',
        exercisesCount: 8,
        duration: '4 h 20 min',
        exercises: [
            { id: 'x1', name: 'Cardio', detail: '45 min', order: 3 },
            { id: 'x2', name: 'Incline Bench Press', detail: '4x12', order: 4 },
        ]
        },
        {
        id: '3',
        title: 'Leg Day',
        muscles: 'Leg, Triceps, Biceps',
        description : '',
        time: '14:30-18:50',
        exercisesCount: 8,
        duration: '4 h 20 min',
        exercises: [
            { id: 'c1', name: 'Cardio', detail: '45 min', order: 3 },
            { id: 'c2', name: 'Incline Bench Press', detail: '4x12', order: 4 },
        ]
        },
    ];

    const dummyTrainingsEmpty : TrainingItem[] = []

    const renderTrainingCard = ({ item }: { item: any }) => (
        <TrainingTile item={item} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <Text style={styles.sectionTitle}>TRAININGS PLANNED</Text>
                }
                data={dummyTrainings}
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
        fontFamily:  'BigShoulders_18pt-Black',
        
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