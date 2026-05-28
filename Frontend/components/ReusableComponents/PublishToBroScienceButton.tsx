import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Public from '../../assets/icons/public.svg'
import React from 'react'

interface PublishToBroScienceButtonData {
    onPress?: () => void,
    }

export default function PublishToBroScienceButton({ onPress }: PublishToBroScienceButtonData) {
  return (
        <TouchableOpacity style={styles.publishButton} onPress={onPress}>
          <Public width={32} height={32} fill={'#322214'} style={styles.publishIcon} />
          <Text style={styles.publishPrefix}>
            PUBLISH TO
          </Text>
          <Text style={styles.publishTarget}>
            BRO SCIENCE
          </Text>
        </TouchableOpacity>
  )
}




const styles = StyleSheet.create({
      publishButton: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#FBAF00',
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
    color: '#322214',
    marginRight: 8,
    lineHeight: 28,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  publishTarget: {
    fontFamily: 'BigShoulders-Bold',
    fontSize: 28,
    color: '#322214',
    lineHeight: 28,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});