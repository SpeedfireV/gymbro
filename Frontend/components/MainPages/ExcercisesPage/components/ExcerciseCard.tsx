import { View, Text, StyleSheet } from "react-native"
import Personal from '../../../../assets/icons/personal.svg'
import Public from '../../../../assets/icons/public.svg'
interface ExcerciseInfo {
  mainImage?: ImageBitmap,
  title: string,
  bodyParts: Array<string>,
  desc: string,
  isPublic: boolean
}

export function ExcerciseCard({ mainImage, title, bodyParts, desc, isPublic }: ExcerciseInfo) {

  return (
    <View style={styles.card}>
      <View>
        <View style={styles.iconPosition}>
          {(isPublic) ? <Public width={24} height={24} /> : <Personal width={24} height={24} />}</View>
        <View style={styles.contentPadding}>
          <Text style={[styles.excerciseTitle, styles.anyText]}>{title}</Text>
          <Text style={[styles.excerciseBodyParts, styles.anyText]}>{bodyParts.join(' ')}</Text>
          <Text style={[styles.excerciseDesc, styles.anyText]}>{desc}</Text>
        </View>
      </View>
    </View>
  )

}


const styles = StyleSheet.create(
  {
    card: {

      backgroundColor: '#111',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#332b00',
      shadowColor: '#FFA500',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,

    },
    iconPosition: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 1
    },
    contentPadding: {
      padding: 16,
    },
    anyText: {
      color: '#EFF1F3'
    },
    excerciseTitle: {
      fontSize: 24,
      marginBottom: 4,
      fontFamily: 'BigShoulders-ExtraBold'
    },
    excerciseBodyParts: {
      fontSize: 20,
      marginBottom: 12,
      fontFamily: 'ChakraPetch-SemiBold'

    },
    excerciseDesc: {
      fontSize: 12,
      fontFamily: 'ChakraPetch-Regular'
    }


  })
