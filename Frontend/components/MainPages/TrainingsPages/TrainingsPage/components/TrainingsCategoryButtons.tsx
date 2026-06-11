import { View, StyleSheet } from "react-native";
import React from "react";
import { TabButton } from "../../../../ReusableComponents/TabButton";

interface TrainingsCategoryButtonsData {
  personalActive: boolean;
  setPersonalActive: (active: boolean) => void;
}

export default function TrainingsCategoryButtons({
  personalActive,
  setPersonalActive,
}: TrainingsCategoryButtonsData) {
  return (
    <View style={styles.doubleButtonContainer}>
      <TabButton
        title={"PERSONAL"}
        enabled={personalActive}
        onSelect={() => setPersonalActive(true)}
      ></TabButton>
      <TabButton
        title={"BRO SCIENCE"}
        enabled={!personalActive}
        onSelect={() => setPersonalActive(false)}
      ></TabButton>
    </View>
  );
}

const styles = StyleSheet.create({
  doubleButtonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
    gap: 10,
  },
});
