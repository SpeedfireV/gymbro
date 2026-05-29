import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../../App";
import EditAddHeader from "../../ReusableComponents/EditAddHeader";
import { Ionicons } from '@expo/vector-icons';
import { ExerciseItem } from '../../ReusableComponents/ComplexTypes'
import ExerciseSimpleTile from './ExerciseSimpleTile'
import PublishToBroScienceButton from '../../ReusableComponents/PublishToBroScienceButton'
import {GBBigButton} from '../../ReusableComponents/GBBigButton'
import BreakTile from './BreakTile';
import Edit from "../../../assets/icons/edit.svg"

export function TrainingDetail({ route, navigation }: StackScreenProps<RootStackParamList, 'TrainingDetail'>) {
    const { training } = route.params;
    
    const renderItem = ({ item }: { item: ExerciseItem }) => (
        item.type === 'exercise' ? (
            <ExerciseSimpleTile
                name={item.name} 
                muscule={item.muscle}
                detail = {item.detail}
                order = {item.order}
                editable = {false}
                innerBreakDuration= {item.innerBreakDuration}
                isRepeating = {item.isRepeating}
            />) : (
            <BreakTile
                editable = {false}
                duration= {item.detail}
        />)
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
                            onBack={() => navigation.navigate("Training")}
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

                        <Text style={styles.title}>EXERCISES</Text>
                    </View>
                </>
            }

            ListFooterComponent={<View style={styles.endingMargin}/>}
        />

        <View style={styles.dualButtonContainer}>
            <View style={styles.BroScienceContainer}>
                <PublishToBroScienceButton
                    onPress={() => {
                    
                    }} 
                />
            </View>
            <GBBigButton
                bgColor= '#FFA500'
                icon = {<Edit width={32} height={32} />}
                onPress={() => {
                navigation.navigate('EditTrainingDetail', { training })
                }} 
            />
        </View>
        
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

    dualButtonContainer:{
        position: 'absolute',
        bottom: 25,
        left: "5%",
        right: "5%",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    BroScienceContainer:{
        flex: 1,
    },
    endingMargin:{
        marginBottom: 100
    }
});