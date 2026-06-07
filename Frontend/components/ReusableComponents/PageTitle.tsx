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
    paddingTop: 24,
  },
  pageTitle: {
    marginLeft: 20,
    marginTop: 20,
    color: '#FF4500',
    fontSize: 36,
    marginBottom: 16,
    fontFamily: 'BigShoulders-ExtraBold',
  },
})
