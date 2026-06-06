import { View, StyleSheet } from 'react-native'
import React from 'react'
import PublishToBroScienceButton from '../../../ReusableComponents/PublishToBroScienceButton'
import { GBBigButton } from '../../../ReusableComponents/GBBigButton'
import Edit from '../../../../assets/icons/edit.svg'

interface ExerciseBottomBarProps {
  isPublic?: boolean;
}

export default function ExerciseBottomBar({isPublic}: ExerciseBottomBarProps) {
  return (
    <View style={styles.footerRow}>
        <PublishToBroScienceButton />
        <GBBigButton bgColor='#FBAF00' icon={<Edit width={32} height={32} />} onPress={() => { }} />
      </View>
  )
}

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignContent: 'center',
    alignItems: 'center',
    height: 64,
    marginBottom: 32,
    marginHorizontal: 24,
  },
});