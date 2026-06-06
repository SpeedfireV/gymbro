import { Text, StyleSheet } from 'react-native'
import React from 'react'

interface ExerciseDescriptionProps {
  description?: string;
}

export default function ExerciseDescription({ description = "The best training for your legs & not only that! Extensive training that improves your whole body!" }: ExerciseDescriptionProps) {
  return (
    <Text style={styles.description}>
      {description}
    </Text>
  )
}

const styles = StyleSheet.create({
  description: {
    fontFamily: 'ChakraPetch-Regular',
    fontSize: 16,
    color: '#EFF1F3',
    textAlign: 'center',
    marginHorizontal: 24,
  },
});