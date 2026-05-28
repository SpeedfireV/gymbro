import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../ExercisePage'

import ArrowLeft from '../../../../assets/icons/arrow_left.svg'
import ArrowRight from '../../../../assets/icons/arrow_right.svg'

export default function ExerciseImageCarousel() {
  return (
    <View style={[styles.imageRow]}>
        <TouchableOpacity style={{backgroundColor: '#FBAF00',  borderRadius: 45, padding: 8}}>
          <ArrowLeft width={24} height={24} fill={'#ffffff'}/>
        </TouchableOpacity>
        <View></View> 
        <TouchableOpacity style={{backgroundColor: '#FBAF00', borderRadius: 45, padding: 8}}>
          <ArrowRight width={24} height={24} fill={'#ffffff'}/>
        </TouchableOpacity>
      </View>
  )
}