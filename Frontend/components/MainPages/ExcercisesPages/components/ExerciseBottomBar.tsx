import { View, StyleSheet } from "react-native";
import React from "react";
import PublishToBroScienceButton from "../../../ReusableComponents/PublishToBroScienceButton";
import { GBBigButton } from "../../../ReusableComponents/GBBigButton";
import Edit from "../../../../assets/icons/edit.svg";
import { RootStackParamList } from "../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

interface ExerciseBottomBarProps {
  isPublic?: boolean;
}

export default function ExerciseBottomBar({
  isPublic,
}: ExerciseBottomBarProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.footerRow}>
      <PublishToBroScienceButton />
      <GBBigButton
        bgColor="#FBAF00"
        icon="editOff"
        onPress={() => {
          navigation.navigate("ExerciseEditPage");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignContent: "center",
    alignItems: "center",
    height: 64,
    marginBottom: 32,
    marginHorizontal: 24,
  },
});
