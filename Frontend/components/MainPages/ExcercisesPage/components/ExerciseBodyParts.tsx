import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../ExercisePage'

import Sports from '../../../../assets/icons/sports.svg'

export default function ExerciseBodyParts() {
  return (
    <View style={styles.metaRow}>
            <View style={styles.metaLeft}>
              <Sports width={24} height={24} style={styles.metaIcon} />
              < Text style={styles.metaLabel}>BODY PARTS</Text>
            </View >
            <Text style={styles.metaValue}>Triceps</Text>
          </View>
  )
}