import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ExerciseSimpleTileProps {
    name: string;
    muscule: string;
    detail: string;
    order: number;
    editable: boolean;
    onDelete?: () => void;
}

export default function ExerciseSimpleTile({name, muscule, order, detail, editable, onDelete} : ExerciseSimpleTileProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>{order}. {name}</Text>
        <Text style={styles.titleText}>{muscule}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={editable? styles.dualWrapper: styles.dualWrapperWhite}>
          <Ionicons name="barbell" size={18} color={editable? "#ffffff": "#000000"} style={styles.icon} />
          <Text style={editable? styles.simpleText: styles.simpleTextWhite}>{detail}</Text>
        </View>

        <View style={editable? styles.dualWrapper: styles.dualWrapperWhite}>
          <Ionicons name="time-outline" size={18} color={editable? "#ffffff": "#000000"} style={styles.icon} />
          <Text style={editable?  styles.simpleText: styles.simpleTextWhite}>1 MIN BREAKS</Text>
        </View>
      </View>
      {
        editable? 
        <TouchableOpacity 
          style={styles.removeButton} 
          activeOpacity={0.7}
          onPress={onDelete}>
          <Ionicons name="trash-outline" size={18} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Remove Exercise</Text>
        </TouchableOpacity>
        :
        <></>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#FFA500',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 20,
  },
  dualWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2c2c2e',
    borderWidth: 1,
    borderColor: '#48484a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  simpleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  removeButton: {
    backgroundColor: '#d33215',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    width: '100%',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  dualWrapperWhite: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ECF0F3',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWhite: {
    marginRight: 8,
    color: '#2D241E',
  },
  simpleTextWhite: {
    color: '#2D241E',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});