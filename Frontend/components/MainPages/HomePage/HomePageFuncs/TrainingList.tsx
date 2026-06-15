
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import TrainingTile from '../../../ReusableComponents/TrainingTile'
import { TrainingItem } from '../../../ReusableComponents/ComplexTypes'
import { Ionicons } from '@expo/vector-icons';

const TrainingsList = ({ selectedDate }: { selectedDate: Date }) => {
    const dummyTrainings : TrainingItem[] = [
        
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