import React, { useState } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import NavigationBar from '../../ReusableComponents/NavigationBar';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../../App";
import NewActivityButton from "../../ReusableComponents/NewActivity"
import { TabButton } from '../../ReusableComponents/TabButton';
import { ExcerciseCard } from './components/ExcerciseCard';

export function ExcercisesPage({ navigation }: StackScreenProps<RootStackParamList, 'Excercises'>) {
  const [activeTab] = useState<keyof RootStackParamList>('Excercises');
  const [PersonalActive, setPersonalActive] = useState(true);

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.headerText}>Excercises</Text>
      </View>
      <ExcercisesSearchBar></ExcercisesSearchBar>

      <View style={styles.doubleButtonContainer}>
        <TabButton title={'PERSONAL'} enabled={PersonalActive} onSelect={() => setPersonalActive(true)}></TabButton>
        <TabButton title={'BRO SCIENCE'} enabled={!PersonalActive} onSelect={() => setPersonalActive(false)}></TabButton>
      </View>


      <ExcerciseCard title='Pull Ups' bodyParts={["Triceps"]} desc='Pull ups are one of the most effective training techniques that enchance...' isPublic={false}></ExcerciseCard>
      <NewActivityButton Title='ADD NEW EXERCISE'
        onPress={() => {
          navigation.navigate('TrainingSelector');
        }}></NewActivityButton>



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
  doubleButtonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: '100%',
    gap: 10,
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
