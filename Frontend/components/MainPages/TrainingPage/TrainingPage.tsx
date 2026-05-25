import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, FlatList  } from 'react-native';
import NavigationBar from '../../ReusableComponents/NavigationBar';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../../App";
import { Ionicons } from '@expo/vector-icons';
import { TrainingItem } from '../../ReusableComponents/ComplexTypes'
import ShortTrainingTile from "../../ReusableComponents/ShortTrainingTile"
import { TabButton } from '../../ReusableComponents/TabButton';
import NewActivityButton from "../../ReusableComponents/NewActivity"

export function TrainingPage({ navigation }: StackScreenProps<RootStackParamList, 'Training'>){
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<keyof RootStackParamList>('Training');
    const [PersonalActive, setPersonalActive] = useState(true);

    const dummyTrainings : TrainingItem[] = [
            {
            id: '1',
            title: 'Leg Day',
            description : 'NIG',
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
            title: 'abscdjk',
            description : 'aasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdaasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdjoaasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdjosajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdabaasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdjosajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdabaasodsjidajsodjoiasdjioasjdajosdjioasdjiasjidaosjdjiaosdjoasjdasjdjaosdjasjdasjdjaosdjioasdjoasjdasjodjoiasdjiasjdjasodjiaosdjoasjdasjdjasdjioasdjioasjdasdjasdoasdjosajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdabsajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdabjosajojasdjiasdjiasjodasjodjasodjioasdjoiasdjoisjdoiasjoisajodasjodjsoajiosajdasjidjoasdosdaoisdab',
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
            description : 'ER',
            muscles: 'Leg, Triceps, Biceps',
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

    const renderItem = ({ item }: { item: TrainingItem }) => (
        <ShortTrainingTile 
            item={item} 
            description={item.description}
            onSelect={(training) => navigation.navigate('DateSelector', { training })} 
        />
    );
    
    return (
    <View style={styles.container}>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>
              TRAININGS
          </Text>
        </View>

        <View style={styles.content}>
            <View style={styles.searchSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Find Training"
                    placeholderTextColor="#747373"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Ionicons 
                    name="search-outline" 
                    size={24} 
                    color="#FFF" 
                    style={styles.searchIcon} 
                />
            </View>
            
            <View style={styles.doubleButtonContainer}>
                <TabButton title={'Personal'} enabled={PersonalActive} onSelect={() => setPersonalActive(true)}></TabButton>
                <TabButton title={'Bro Science'} enabled={!PersonalActive } onSelect={() => setPersonalActive(false)}></TabButton>
            </View>

            <FlatList
                data={dummyTrainings}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
        </View>

        <NewActivityButton
            Title='ADD NEW TRAINING'
            onPress={() => {
            navigation.navigate('TrainingSelector');
            }} 
        />

        <NavigationBar activeTab={activeTab} />
    </View>
  );
    
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    edditAddContainer:{
        padding: 10,
        flex: 0.15,
    },
    content: {
        flex: 0.9,
        paddingHorizontal: 20,
    },
    pageTitleContainer: {
        flex: 0.15,
        padding: 20,
    },
    doubleButtonContainer: {
        flexDirection: "row",
        marginBottom: 20,
        width: '100%',
        gap: 10
    },
    pageTitle: {
        marginTop: 20,
        color: '#FF4500',
        fontSize: 32,
        marginBottom: 30,
        fontFamily:  'BigShoulders',
        fontWeight: '900',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#272727',
        borderWidth: 2,
        borderColor: '#ffffff',
        borderRadius: 10,
        height: 55,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: 10,
    },
});