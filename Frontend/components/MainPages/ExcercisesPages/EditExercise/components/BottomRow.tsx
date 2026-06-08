import { View, StyleSheet } from "react-native";
import React from "react";
import CancelChangesButton from "../../../../ReusableComponents/CancelChangesButton";
import { GBBigButton } from "../../../../ReusableComponents/GBBigButton";
import { Icon } from "../../../../../Icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../App";

export default function BottomRow() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={[styles.bottomRow]}>
      <CancelChangesButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{ width: 16 }} />
      <GBBigButton
        bgColor="#FBAF00"
        icon={<Icon name="editOff" fill={"#322214"} />}
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    marginHorizontal: 24,
    marginBottom: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
