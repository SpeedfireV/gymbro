
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { GBBigButton } from '../../ReusableComponents/GBBigButton';
import EditOff from '../../../assets/icons/edit_off.svg'
import Sports from '../../../assets/icons/sports.svg'
import CancelChangesButton from '../../ReusableComponents/CancelChangesButton';
import { RootStackParamList } from '../../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Spacer from '../../ReusableComponents/Spacer';


export default function ExerciseEditPage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <TextInput style={[styles.editArea, styles.titleEditText]}>
        PULL UPS
      </TextInput>

      <TouchableOpacity style={[styles.editArea, {flexDirection: 'row', justifyContent: 'space-between'}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Sports width={24} height={24} fill={'#FFFFFF'} style={{marginRight: 8}} />
          <Text style={styles.bodyPartsText}>BODY PARTS</Text>
        </View>
        <Text style={styles.descEditText}>Triceps</Text>
      </TouchableOpacity>

      <TextInput style={[styles.editArea, styles.descEditText]} multiline={true}>
        Pull ups are a great exercise for building upper body strength, particularly targeting the back muscles. To perform a pull up, grip the bar with your hands slightly wider than shoulder-width apart, and pull your body up until your chin is above the bar. Lower yourself back down with control and repeat for the desired number of repetitions.
      </TextInput>
      <Spacer />
      <View style={[styles.bottomRow]}>
      <CancelChangesButton onPress={() => {
        navigation.goBack();
      }} />
            <GBBigButton bgColor="#FBAF00" icon={<EditOff />} onPress={() => {
      }} /></View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#111111',
  },
  editArea: {
    backgroundColor: '#242423',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EFF1F3',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  titleEditText: {
    fontSize: 18,
    fontFamily: 'ChakraPetch-Regular',
    color: '#EFF1F3',
    marginTop: 48,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  bodyPartsText: {
    fontSize: 20,
    fontFamily: 'ChakraPetch-Bold',
    color: '#FFFFFF',
  },
  descEditText: {
    fontSize: 16,
    fontFamily: 'ChakraPetch-Regular',
    color: '#EFF1F3'
  },
  bottomRow: {
    marginHorizontal: 24,
    marginBottom: 48,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  }
});