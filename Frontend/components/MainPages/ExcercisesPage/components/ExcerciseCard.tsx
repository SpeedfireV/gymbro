import { View, Text, StyleSheet } from "react-native"

export function ExcerciseCard() {

  return (
    <View style={styles.card}>
      <View style={styles.contentPadding}>
        <Text style={[styles.excerciseTitle, styles.anyText]}>Pull Ups</Text>
        <Text style={[styles.excerciseBodyParts, styles.anyText]}>Triceps</Text>
        <Text style={[styles.excerciseDesc, styles.anyText]}>Pull ups are one of the most effective training techniques that enchance...</Text>
      </View>
    </View>
  )

}


const styles = StyleSheet.create(
  {
    card: {
      shadowColor: '#FBAF00',
      shadowOpacity: 127,
      backgroundColor: '#181818',
      borderRadius: 12,

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
