import { View, Text, StyleSheet } from "react-native"
import Personal from '../../../../assets/icons/personal.svg'

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
      <View style={styles.contentPadding}>

        {(isPublic) ? <Personal width={32} height={32} /> : <Personal width={32} height={32} />}
        <Text style={[styles.excerciseTitle, styles.anyText]}>{title}</Text>
        <Text style={[styles.excerciseBodyParts, styles.anyText]}>{bodyParts.join(' ')}</Text>
        <Text style={[styles.excerciseDesc, styles.anyText]}>{desc}</Text>

      </View>
    </View>
  )

}


const styles = StyleSheet.create(
  {
    card: {
      shadowColor: '#FBAF00',
      shadowOpacity: 127,
      shadowRadius: 8,
      shadowOffset: { width: 12, height: 12 },
      backgroundColor: '#181818',
      borderRadius: 12,

    },
    iconPosition: {
      position: 'absolute',
      top: 8,
      right: 8
    },
    contentPadding: {
      padding: 16
    },
    anyText: {
      color: '#EFF1F3'
    },
    excerciseTitle: {
      fontSize: 24,
      fontWeight: '800',
      fontFamily: 'BigShoulders'
    },
    excerciseBodyParts: {
      fontSize: 20,
      fontWeight: 'semibold'
    },
    excerciseDesc: {
      fontSize: 12,
      fontWeight: 'regular',
    }


  })
