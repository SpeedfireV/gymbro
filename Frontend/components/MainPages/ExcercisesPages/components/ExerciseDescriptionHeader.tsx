import { Text, StyleSheet } from 'react-native'
import React from 'react'

interface ExerciseDescriptionProps {
  title?: string;
}

export default function ExerciseDescription({ title = "Title" }: ExerciseDescriptionProps) {
  return (
    <Text style={styles.description}>
      {title}
    </Text>
  )
}

const styles = StyleSheet.create({
  description: {
    fontFamily: 'ChakraPetch-Regular',
    fontSize: 38,
    color: '#EFF1F3',
    textAlign: 'center',
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#EFF1F3',
  },
});