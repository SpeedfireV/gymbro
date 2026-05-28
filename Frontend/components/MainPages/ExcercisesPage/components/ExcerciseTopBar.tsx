import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../ExercisePage';
import { GBSmallButton } from '../../../ReusableComponents/GBSmallButton';
import ArrowBack from '../../../../assets/icons/arrow_back.svg'
import Delete from '../../../../assets/icons/delete.svg'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';




export default function ExerciseTopBar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
     <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <GBSmallButton bgColor='#FBAF00' icon={<ArrowBack width={24} height={24} />} onPress={() => {
            navigation.goBack();
          }} />

          <Text style={styles.exerciseTitle}>PULL UPS</Text>
        </View>
        <GBSmallButton bgColor={'#E03616'} icon={<Delete width={24} height={24}  />} onPress={() => {}} />

      </View>
  )
}