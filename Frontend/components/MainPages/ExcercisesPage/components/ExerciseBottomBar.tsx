import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../ExercisePage'
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