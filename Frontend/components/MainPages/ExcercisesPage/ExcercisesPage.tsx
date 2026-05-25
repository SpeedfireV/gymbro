import React, { useState } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import NavigationBar from '../../ReusableComponents/NavigationBar';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../../App";
import NewTrainingButton from '../HomePage/HomePageFuncs/NewTraining';
import { TabButton } from './components/TabButton';
import { ExcerciseCard } from './components/ExcerciseCard';

export function ExcercisesPage({ navigation }: StackScreenProps<RootStackParamList, 'Excercises'>) {
  const [activeTab] = useState<keyof RootStackParamList>('Excercises');

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.headerText}>Excercises</Text>
      </View>
      <ExcercisesSearchBar></ExcercisesSearchBar>

      <View className='flex flex-col'>
        <TabButton title={'Personal'} enabled={true}></TabButton>
        <TabButton title={'Bro Science'} enabled={false}></TabButton>
      </View>


      <ExcerciseCard title='Pull Ups' bodyParts={["Triceps"]} desc='Pull ups are one of the most effective training techniques that enchance...' isPublic={false}></ExcerciseCard>
      <NewTrainingButton
        onPress={() => {
          navigation.navigate('TrainingSelector');
        }}></NewTrainingButton>

      <View style={styles.container}></View>
      <NavigationBar activeTab={activeTab} />
    </View>
  );

}



export default function ExcercisesSearchBar() {
  return (

    <View>
      <Text>Find Training</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mainCol: {
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    color: '#FF4500',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});
