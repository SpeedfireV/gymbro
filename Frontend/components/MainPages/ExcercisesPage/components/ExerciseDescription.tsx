import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../ExercisePage'


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