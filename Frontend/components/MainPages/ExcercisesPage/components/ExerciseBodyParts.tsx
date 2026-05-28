import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../ExercisePage'

import Sports from '../../../../assets/icons/sports.svg'

interface ExerciseBodyPartsProps {
  bodyParts?: string;
}


export default function ExerciseBodyParts({ bodyParts = "Triceps" }: ExerciseBodyPartsProps) {
  return (
    <View style={styles.metaRow}>
            <View style={styles.metaLeft}>
              <Sports width={24} height={24} style={styles.metaIcon} />
              < Text style={styles.metaLabel}>BODY PARTS</Text>
            </View >
            <Text style={styles.metaValue}>{bodyParts}</Text>
          </View>
  )
}