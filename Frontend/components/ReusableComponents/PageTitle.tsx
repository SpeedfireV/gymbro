import { StyleSheet, View, Text } from "react-native"

interface PageTitleData {
  title: string
}

export function PageTitle({ title }: PageTitleData) {
  return (<View style={styles.pageTitleContainer}>
    <Text style={styles.pageTitle}>
      {title}
    </Text>
  </View>)
}



const styles = StyleSheet.create({
  pageTitleContainer: {
    flex: 0.15,
    padding: 20,
  },
  pageTitle: {
    marginTop: 20,
    color: '#FF4500',
    fontSize: 36,
    marginBottom: 30,
    fontFamily: 'BigShoulders-ExtraBold',
  },
})
