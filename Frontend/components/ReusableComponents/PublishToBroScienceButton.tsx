import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Public from '../../assets/icons/public.svg'
import React from 'react'

interface PublishToBroScienceButtonData {
    isPublic?: boolean;
    onPress?: () => void,
    }

export default function PublishToBroScienceButton({ isPublic = true, onPress }: PublishToBroScienceButtonData) {
  return (
        <TouchableOpacity style={[styles.publishButton, { backgroundColor: isPublic ? '#FBAF00' : '#322214' }]} onPress={onPress}>
          <Public width={32} height={32} fill={ isPublic ? '#322214' : '#EFF1F3'} style={styles.publishIcon} />
          <Text style={[styles.publishPrefix, {color: isPublic ? '#322214' : '#EFF1F3'}]}>
            {isPublic ? 'PUBLISH TO' : 'REMOVE FROM'}
          </Text>
          <Text style={[styles.publishTarget, {color: isPublic ? '#322214' : '#EFF1F3'}]}>
            BRO SCIENCE
          </Text>
        </TouchableOpacity>
  )
}




const styles = StyleSheet.create({
      publishButton: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    height: 64,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishIcon: {
    marginRight: 8,
    alignSelf: 'center',
  },
  publishPrefix: {
    fontFamily: 'BigShoulders-SemiBold',
    fontSize: 28,
    marginRight: 8,
    lineHeight: 28,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  publishTarget: {
    fontFamily: 'BigShoulders-Bold',
    fontSize: 28,
    lineHeight: 28,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});