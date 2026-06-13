import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../../Colors";
import AddNewExerciseTopBar from "./components/AddNewExerciseTopBar";
import ImageCarousel from "../EditExercise/components/ImageCarousel";
import AddMedia from "../EditExercise/components/AddMedia";
import EditBodyParts from "../EditExercise/components/EditBodyParts";
import Spacer from "../../../ReusableComponents/Spacer";
import CreateExerciseButton from "./components/CreateExerciseButton";
import TextInputWithTitle from "../../../ReusableComponents/TextInputWithTitle";

export default function AddNewExercisePage() {
  const [name, setNameState] = useState("");
  const [description, setDescriptionState] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  return (
    <View style={styles.container}>
      <AddNewExerciseTopBar />
      <ImageCarousel />
      <AddMedia />
      <EditBodyParts />
      <View style={{ marginBottom: 32 }}>
        <TextInputWithTitle
          fieldTitle="Exercise Name"
          value={name}
          onChangeText={setNameState}
          placeholder="Best Training Ever"
        />
      </View>
      <View
        style={{
          marginBottom: 48,
          flex: 1,
        }}
      >
        <TextInputWithTitle
          fieldTitle="Description"
          value={description}
          onChangeText={setDescriptionState}
          placeholder="Describe what it's about!"
          multiline={true}
        />
      </View>

      <CreateExerciseButton
        name={name}
        description={description}
        bodyParts={[]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
