import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../../App";
import EditAddHeader from "../../ReusableComponents/EditAddHeader";
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../../ReusableComponents/ComplexTypes'
import ExerciseSimpleTile from './ExcerciseSimpleTile'
import NewActivityButton from "../../ReusableComponents/NewActivity"

export function TrainingDetail({ route, navigation }: StackScreenProps<RootStackParamList, 'TrainingDetail'>) {
    const { training } = route.params;
    
    const renderItem = ({ item }: { item: Exercise }) => (
        <ExerciseSimpleTile
            name={item.name} 
            muscule={item.muscule}
            detail = {item.detail}
            order = {item.order}
            editable = {false}
            onDelete={()=>{}}
        />
    );

    return (
    <View style={styles.container}>
        <FlatList
            data={training.exercises}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 0 }}
            
            ListHeaderComponent={
                <>
                    <View style={styles.contentUpper}>
                        <EditAddHeader
                            title={training.title}
                            onBack={() => navigation.goBack()}
                            onDelete={() => {}}
                            showDelete={true}
                        />
                    </View>

                    <View style={styles.contentMiddle}>
                        <View style={styles.infoFrame}>
                            <View style={styles.rightSide}>
                                <Ionicons name="barbell-outline" size={30} color="#ffffff" />
                                <Text style={styles.frameText}>BODY PARTS</Text>
                            </View>
                            <Text style={styles.justText}>{training.muscles}</Text>
                        </View>
                        <View style={styles.infoFrame}>
                            <View style={styles.rightSide}>
                                <Ionicons name="time-outline" size={30} color="#ffffff" />
                                <Text style={styles.frameText}>TOTAL TRAINING TIME</Text>
                            </View>
                            <Text style={styles.justText}>{training.duration}</Text>
                        </View>
                    </View>


                    <View style={styles.contentLower}>
                        <View style={styles.midTextWraper}>
                            <Text style={styles.midText}>
                                {training.description}
                            </Text>
                        </View>

                        <Text style={styles.title}>EXCERCISES</Text>
                    </View>
                </>
            }
        />

        <NewActivityButton
            Title='MOVE TO BETTER GROUNDS'
            onPress={() => {
           navigation.navigate('EditTrainingDetail', { training })
            }} 
        />
        
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    contentUpper: {
        padding: 20,
        marginBottom: 20
    },
    contentMiddle: {
        padding: 20,
        alignItems: 'flex-start',
        gap: 20
    },
    contentLower: {
        padding: 20
    },
    infoFrame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    frameText : {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 23,
        marginLeft: 8,
    },
    justText : {
        color: '#ffffff',
        fontSize: 23,
        marginLeft: 8,
    },
    rightSide : {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    midTextWraper: {
        justifyContent: "center",
        textAlign: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',

        marginHorizontal: 10,
    },
    midText: {
        marginTop: 18,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 20,
    },
    title: {
        marginTop: 20,
        color: '#FF4500',
        fontSize: 32,
        marginBottom: 30,
        fontWeight: '600',
    },
});