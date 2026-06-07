import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { format, isSameDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface DayTileProps {
  item: Date;
  selectedDate: Date;
  pressEffect: (date: Date) => void;
}

const DayTile = ({ item, selectedDate, pressEffect }: DayTileProps) => {
    return (
        <TouchableOpacity 
            onPress={() => pressEffect(item)}
            style={[styles.dateCard, isSameDay(item, selectedDate) && styles.selectedCard]}
            >
            <Text style={[styles.dayName, isSameDay(item, selectedDate) && styles.selectedText]}>
                {format(item, 'eee', { locale: enUS }).toUpperCase().substring(0, 3)}
            </Text>
            <View style={[styles.dateCircle, isSameDay(item, selectedDate) && styles.selectedCircle]}>
                <Text style={[styles.dateNumber, isSameDay(item, selectedDate) && styles.selectedNumber]}>
                {format(item, 'd')}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  dateCard: {
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 5,
  },
  selectedCard: {
  },
  dayName: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'BigShoulders',
    fontWeight: '900'
  },
  dateCircle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  selectedCircle: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  dateNumber: {
    color: '#fff',
    fontSize: 16,
  },
  selectedNumber: {
    color: '#000',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#fff',
  }
});

export default DayTile;