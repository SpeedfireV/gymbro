import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GBSmallButton } from '../../../ReusableComponents/GBSmallButton';
import ArrowBack from '../../../../assets/icons/arrow_back.svg'
import Delete from '../../../../assets/icons/delete.svg'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

interface ExerciseTopBarProps {
  exerciseName?: string;
}

export default function ExerciseTopBar({ exerciseName = "PULL UPS" }: ExerciseTopBarProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
     <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <GBSmallButton bgColor='#FBAF00' icon={<ArrowBack width={24} height={24} />} onPress={() => {
            navigation.goBack();
          }} />
          <Text style={styles.exerciseTitle}>{exerciseName}</Text>
        </View>
        <GBSmallButton bgColor={'#E03616'} icon={<Delete width={24} height={24}  />} onPress={() => {}} />
      </View>
  )
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 48,
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  exerciseTitle: {
    fontFamily: 'BigShoulders-ExtraBold',
    fontSize: 36,
    color: '#FFFFFF',
    marginLeft: 16,
  },
});