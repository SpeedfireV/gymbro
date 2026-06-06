import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { GBSearchBar } from '../../ReusableComponents/GBSearchBar';
import EditAddHeader from '../../ReusableComponents/EditAddHeader'
import { ExerciseCard } from '../../ReusableComponents/ExerciseCard';
import { AddTrainingComponent } from './AddTrainingComponent';
import { ExerciseItem, ExercisePrototype } from '../../ReusableComponents/ComplexTypes'


interface AddExercisePageProps {
    nextTempId: number;
    exercisesList: ExerciseItem[];
    setExercisesList: React.Dispatch<React.SetStateAction<ExerciseItem[]>>;
    setNextTempId: React.Dispatch<React.SetStateAction<number>>;
    onBack: () => void;
}

export function AddExercisePage({nextTempId, setExercisesList, setNextTempId, exercisesList,  onBack}: AddExercisePageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddExerciseVisable, setIsAddExerciseVisable] = useState(false);
    const [chosenExercise, setChosenExercise] = useState<ExercisePrototype>({title: "",desc: "",isPublic: false,bodyParts: [], isRepeating: false});

    const EXERCISES = [{
        title: 'Pull Ups1',
        bodyParts: ["Triceps"],
        desc: 'Pull ups are one of the most effective training techniques that enchance...',
        isPublic: false,
        isRepeating: true,
    }, {
        title: 'Cardio 1',
        bodyParts: ["Triceps"],
        desc: 'Pull ups are one of the most effective training techniques that enchance...',
        isPublic: false,
        isRepeating: false,
    },
    {
        title: 'Pull Ups3',
        bodyParts: ["Triceps"],
        desc: 'Pull ups are one of the most effective training techniques that enchance...',
        isPublic: false,
        isRepeating: true,
    },
    {
        title: 'Cardio 2',
        bodyParts: ["Triceps"],
        desc: 'Pull ups are one of the most effective training techniques that enchance...',
        isPublic: false,
        isRepeating: false,
    },
    {
        title: 'Pull Ups5',
        bodyParts: ["Triceps"],
        desc: 'Pull ups are one of the most effective training techniques that enchance...',
        isPublic: true,
        isRepeating: true,
    }
    ]

    const handleAddExercise = (sets: number, reps: number, minutes: number, seconds: number) => {
            const totalDurationString = `${minutes} MIN ${seconds > 0 ? seconds + ' SEC' : ''}`.trim();
            const details =  `${sets}x${reps}`.trim()
            
            const newExerciseItem: ExerciseItem = {
                id: nextTempId.toString(),
                type: 'exercise',
                detail: details,
                order: Math.max(...exercisesList.map(item => item.order)) + 1,
                muscle: chosenExercise.bodyParts,
                name: chosenExercise.title,
                innerBreakDuration: totalDurationString,
                isRepeating: chosenExercise.isRepeating
            };
    
            setNextTempId(nextTempId + 1)
    
            console.log(nextTempId)
    
            setExercisesList([...exercisesList, newExerciseItem]);
            onBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentUpper}>
                <EditAddHeader
                    title='ADD EXERCISE'
                    onBack={onBack}
                    showDelete = {false}
                />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <GBSearchBar placeholderText='Find Exercise' searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
            
                data={EXERCISES}
                contentContainerStyle={{ paddingBottom: 100 }}
                ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
                renderItem={({ item }) => (
                    <View style={{ paddingHorizontal: 20 }}>
                        <ExerciseCard
                        
                        title={item.title}
                        bodyParts={item.bodyParts}
                        desc={item.desc}
                        isPublic={item.isPublic}
                        showIcon={false}
                        onPress={() => {
                            setChosenExercise({
                                title: item.title,
                                desc: item.desc,
                                isPublic: item.isPublic,
                                bodyParts: item.bodyParts,
                                isRepeating: item.isRepeating
                                })
                            setIsAddExerciseVisable(true)}
                        }
                        /></View>
                    )}
                keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <AddTrainingComponent
                visible={isAddExerciseVisable}
                isExercise = {true}
                isRepeating = {chosenExercise.isRepeating}
                onClose={() => setIsAddExerciseVisable(false)}
                onAddExercise={handleAddExercise}
            />
        </View>
    )
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

})