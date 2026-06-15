import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Personal from "../../assets/icons/personal.svg";
import Public from "../../assets/icons/public.svg";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors } from "../../Colors";
interface ExerciseInfo {
  mainImage?: ImageBitmap;
  title: string;
  bodyParts: string;
  desc: string;
  showIcon: boolean;
  onPress: () => void;
}

export function ExerciseCard({
  mainImage,
  title,
  bodyParts,
  desc,
  showIcon,
  onPress,
}: ExerciseInfo) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View>
          {showIcon ? (
            <View style={styles.iconPosition}>
              <Public width={24} height={24} />
            </View>
          ) : (
            <View style={styles.iconPosition} />
          )}
          <View style={styles.contentPadding}>
            <Text style={[styles.excerciseTitle, styles.anyText]}>{title}</Text>
            <Text style={[styles.excerciseBodyParts, styles.anyText]}>
              {bodyParts}
            </Text>
            <Text style={[styles.excerciseDesc, styles.anyText]}>{desc}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.onSurface,
    borderRadius: 12,
    borderWidth: 1,
    boxShadow: `0px 0px 8px ${colors.activeYellow}`,
  },
  iconPosition: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  contentPadding: {
    padding: 16,
  },
  anyText: {
    color: "#EFF1F3",
  },
  excerciseTitle: {
    fontSize: 24,
    marginBottom: 4,
    fontFamily: "BigShoulders-ExtraBold",
  },
  excerciseBodyParts: {
    fontSize: 20,
    marginBottom: 12,
    fontFamily: "ChakraPetch-SemiBold",
  },
  excerciseDesc: {
    fontSize: 12,
    fontFamily: "ChakraPetch-Regular",
  },
});
