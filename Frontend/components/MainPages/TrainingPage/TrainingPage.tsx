import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import NavigationBar from '../../ReusableComponents/NavigationBar';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../../App";

export function TrainingPage({ navigation }: StackScreenProps<RootStackParamList, 'Training'>){
    const [activeTab, setActiveTab] = useState<keyof RootStackParamList>('Training');
    
    return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>Training</Text>
      </View>

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