import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TrainingItem } from './ComplexTypes'

interface TrainingTileProps {
  item: TrainingItem;
}

const TrainingTile = ({ item }: TrainingTileProps) => {
    return (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.muscles}</Text>
        <Text style={styles.cardTime}>{item.time}</Text>
    
        <View style={styles.infoRow}>
            <View style={styles.infoFrame}>
                <Text style={styles.frameText}>
                    <Ionicons 
                        name="barbell-outline"
                        size={20} 
                        color={'#000000'}
                    /> {item.exercisesCount} Exercises
                </Text>
            </View>
                <View style={styles.infoFrame}>
                    <Text style={styles.frameText}>
                        <Ionicons 
                            name="time-outline" 
                            size={20} 
                            color={'#000000'} 
                        /> {item.duration}
                    </Text>
                </View>
            </View>
    
        <Text style={styles.exercisesHeader}>EXERCISES</Text>
        {item.exercises.map((ex: any) => (
            <View key={ex.id} style={styles.exerciseItem}>
                <Text style={styles.exerciseText}>{ex.order}. {ex.name}</Text>
                <Text style={styles.exerciseTime}>{ex.detail}</Text>
            </View>
        ))}
    </View>
  );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: '#333',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: '#FFA500',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    cardTitle: {
        fontFamily: 'ChakraPetch-SemiBold',
        color: '#FFA500',
        fontSize: 30,
        textAlign: 'center',
    },
    frameText: {
        fontFamily: 'ChakraPetch-SemiBold',
        color: '#000000',
        fontSize: 17,
        textAlign: 'center'
    },
    cardSubtitle: {
        fontFamily: 'ChakraPetch-SemiBold',
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
    },
    cardTime: {
        color: '#ffffff',
        fontFamily: 'ChakraPetch-SemiBold',
        textAlign: 'center',
        marginBottom: 15,
    },
    infoRow: { 
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    infoFrame: {
        backgroundColor: '#EEE',
        padding: 8,
        borderRadius: 5,
        flexDirection: 'row'
    },
    exercisesHeader: {
        fontFamily: 'ChakraPetch-SemiBold',
        color: '#FF4500',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    exerciseItem: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: '#ffffff', 
        padding: 12, 
        borderRadius: 5, 
        marginBottom: 8 
    },
    exerciseText: { 
        color: '#000000',
        fontFamily: 'ChakraPetch-Medium',
    },
    exerciseTime: {
        color: '#000000',
        fontFamily: 'ChakraPetch-Medium',
    }
});

export default TrainingTile