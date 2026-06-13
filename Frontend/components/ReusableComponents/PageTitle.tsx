import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../Colors";

interface PageTitleData {
  title: string;
}

export function PageTitle({ title }: PageTitleData) {
  return (
    <View style={styles.pageTitleContainer}>
      <Text style={styles.pageTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitleContainer: {
    paddingTop: 24,
  },
  pageTitle: {
    marginLeft: 24,
    marginTop: 20,
    color: colors.fireRed,
    fontSize: 36,
    marginBottom: 16,
    fontFamily: "BigShoulders-ExtraBold",
  },
});
