import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

export default function Spacer() {
  return (
    <View style={styles.spacer} />
  )
}

export const styles = StyleSheet.create({
  spacer: {
    flex: 1,
  },
});