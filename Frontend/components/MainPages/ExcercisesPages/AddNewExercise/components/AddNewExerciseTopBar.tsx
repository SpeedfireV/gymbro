import { View, Text } from "react-native";
import React from "react";
import { GBSmallButton } from "../../../../ReusableComponents/GBSmallButton";
import { colors } from "../../../../../Colors";
import { fonts } from "../../../../../Fonts";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";

export default function AddNewExerciseTopBar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 48,
        marginHorizontal: 24,
        alignItems: "center",
        marginBottom: 64,
      }}
    >
      <GBSmallButton
        bgColor={colors.activeYellow}
        onPress={navigation.goBack}
      />
      <Text
        style={{
          fontSize: 36,
          fontFamily: fonts.bigShouldersExtraBold,
          color: colors.platiniumWhite,
          marginLeft: 12,
        }}
      >
        NEW EXERCISE
      </Text>
    </View>
  );
}
