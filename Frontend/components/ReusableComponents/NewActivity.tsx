import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NewActivityButtonProps {
  Title: string,
  onPress: () => void;
}

const NewActivityButton = ({ Title, onPress }: NewActivityButtonProps) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="add-circle" size={30} color="#000" />
      <Text style={styles.text}>{Title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 90,
    right: 0,
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  text: {
    color: '#000',
    fontWeight: '900',
    fontSize: 16,
    marginLeft: 10,
    letterSpacing: 0.5,
  },
});

export default NewActivityButton;