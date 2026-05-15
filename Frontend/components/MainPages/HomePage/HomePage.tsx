import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationBar from '../../ReusableComponents/NavigationBar';
import Calendar from './HomePageFuncs/Calendar';
import TrainingsList from './HomePageFuncs/TrainingList'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../../App";
import NewTrainingButton from "./HomePageFuncs/NewTraining"


export function HomePage({ navigation }: StackScreenProps<RootStackParamList, 'Home'>){
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<keyof RootStackParamList>('Home');

    return (
    <View style={styles.container}>
      <Calendar
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <View style={styles.content}>
        <TrainingsList selectedDate={selectedDate} />
      </View>

      <NewTrainingButton 
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
  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});