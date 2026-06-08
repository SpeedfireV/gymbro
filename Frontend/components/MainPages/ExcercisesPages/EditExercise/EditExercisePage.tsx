import { View, StyleSheet } from "react-native";
import React from "react";
import Spacer from "../../../ReusableComponents/Spacer";
import EditTitle from "./components/EditTitle";
import ImageCarousel from "./components/ImageCarousel";
import AddMedia from "./components/AddMedia";
import EditBodyParts from "./components/EditBodyParts";
import EditDescription from "./components/EditDescription";
import BottomRow from "./components/BottomRow";

export default function ExerciseEditPage() {
  return (
    <View style={styles.container}>
      <EditTitle />
      <ImageCarousel />
      <AddMedia />
      <EditBodyParts />
      <EditDescription />
      <Spacer />
      <BottomRow />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#111111",
  },
});
