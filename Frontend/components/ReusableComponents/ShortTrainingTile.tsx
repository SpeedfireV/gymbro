import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TrainingItem } from './ComplexTypes'

interface Props {
  item: TrainingItem;
  description: string;
  showPublicity: boolean;
  onSelect: (item: TrainingItem) => void;
}

const PRIVATE_ICON = "person-circle-outline";
const PUBLIC_ICON = "earth-outline";

const ShortTrainingTile = ({ item, description, showPublicity, onSelect }: Props) => {
  return (
    <TouchableOpacity 
        style={styles.card} 
        onPress={() => onSelect(item)}
        activeOpacity={0.7}
    >

      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.muscles}>{item.muscles}</Text>
      </View>
      
      <Text style={styles.description}>{description}</Text>

      <View style={styles.Splitter}>
        <View style={styles.infoFrame}>
            <Ionicons name="barbell-outline" size={20} color="#000" />
            <Text style={styles.frameText}>{item.exercisesCount} Excercises</Text>
        </View>
            <View style={styles.infoFrame}>
                <Ionicons name="time-outline" size={20} color="#000" />
                <Text style={styles.frameText}>{item.duration}</Text>
            </View>
        </View>

        
        <View style={styles.doubleHolder}>
            <Ionicons name= {item.isPublic? PUBLIC_ICON:PRIVATE_ICON} size={30} color="#FFA500" />
            <Text style={styles.orangeText}>{item.isPublic? "Public":"Private"}</Text>
        </View>


    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
      backgroundColor: '#111',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#332b00',
      shadowOffset: { width: 0, height: 0 },
      shadowColor: '#FFA500',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
  },
  headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 15,
  },
  title: {
      color: '#FFF',
      fontSize: 22,
      fontFamily: 'BigShoulders',
      fontWeight: '900'
  },
  muscles: {
      color: '#FFF',
      fontSize: 14,
      fontFamily: 'BigShoulders',
      fontWeight: '900',
  },
  description: {
      color: '#BBB',
      fontSize: 14,
      lineHeight: 20,
      textAlign: 'center',
      marginBottom: 20,
  },
  Splitter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  infoFrame: {
      backgroundColor: '#F0F0F0',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 8,
      flex: 0.48,
  },

  doubleHolder: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 20,
      flex: 0.48,
  },

  frameText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 13,
      marginLeft: 8,
  },

  orangeText: {
      color: '#FFA500',
      fontWeight: 'bold',
      fontSize: 20,
      marginLeft: 8,
  },

});

export default ShortTrainingTile;