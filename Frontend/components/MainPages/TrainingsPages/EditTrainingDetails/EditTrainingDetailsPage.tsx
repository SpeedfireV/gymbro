import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import { ExerciseItem } from "../../../ReusableComponents/ComplexTypes";
import ExerciseCard from "../components/ExerciseCard";
import CancelChangesButton from "../../../ReusableComponents/CancelChangesButton";
import { GBBigButton } from "../../../ReusableComponents/GBBigButton";
import { AddTrainingComponent } from "./components/AddTrainingComponent";
import BreakTile from "../components/BreakTile";
import { AddExerciseToTrainingPage } from "./components/AddExerciseToTrainingPage";
import EditTrainingTitle from "./components/EditTrainingTitle";
import TrainingDetailsInfo from "../TrainingDetails/components/TrainingDetailsInfo";
import EditTrainingDescription from "./components/EditTrainingDescription";
import { fonts } from "../../../../Fonts";
import { colors } from "../../../../Colors";
import AddExerciseOrBreak from "./components/AddExerciseOrBreak";

export function EditTrainingDetailsPage({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "EditTrainingDetail">) {
  const { training } = route.params;

  const [titleText, setTitleText] = useState(training.title);
  const [descriptionText, setDescriptionText] = useState(training.description);
  const [exercisesList, setExercisesList] = useState<ExerciseItem[]>(
    training.exercises,
  );
  const [nextTempId, setNextTempId] = useState<number>(1000000000);

  const [isAddExerciseVisible, setIsAddExerciseVisible] = useState(false);
  const [isAddBreakVisible, setIsAddBreakVisible] = useState(false);

  const handleAddBreak = (minutes: number, seconds: number) => {
    const totalDurationString =
      `${minutes} MIN ${seconds > 0 ? seconds + " SEC" : ""}`.trim();

    const newBreakItem: ExerciseItem = {
      id: nextTempId.toString(),
      type: "break",
      detail: "none",
      order: -1,
      muscle: ["none"],
      name: "Break",
      innerBreakDuration: totalDurationString,
    };

    setNextTempId(nextTempId + 1);

    console.log(nextTempId);

    setExercisesList([...exercisesList, newBreakItem]);
  };

  const renderItem = ({ item }: { item: ExerciseItem }) =>
    item.type === "exercise" ? (
      <ExerciseCard
        name={item.name}
        muscle={item.muscle}
        detail={item.detail}
        order={item.order}
        editable={true}
        onDelete={() => handleDeleteExercise(item.id)}
        innerBreakDuration={item.innerBreakDuration}
        isRepeating={item.isRepeating}
      />
    ) : (
      <BreakTile
        editable={true}
        duration={item.innerBreakDuration}
        onDelete={() => handleDeleteExercise(item.id)}
      />
    );

  const handleDeleteExercise = (idToRemove: string) => {
    const filteredList = exercisesList.filter((item) => item.id !== idToRemove);
    console.log("EnteredDeleter");
    let currentOrder = 1;

    const updatedList = filteredList.map((item) => {
      if (item.type === "break") {
        return item;
      }

      const updatedItem = { ...item, order: currentOrder };
      currentOrder++;
      return updatedItem;
    });
    setExercisesList(updatedList);
  };

  return isAddExerciseVisible ? (
    <AddExerciseToTrainingPage
      exercisesList={exercisesList}
      setExercisesList={setExercisesList}
      nextTempId={nextTempId}
      setNextTempId={setNextTempId}
      onBack={() => setIsAddExerciseVisible(false)}
    />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={exercisesList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: 24 }}
        ListHeaderComponent={
          <View>
            <View style={{ marginTop: 48, marginBottom: 32 }}>
              <EditTrainingTitle title={titleText} setTitle={setTitleText} />
            </View>
            <View
              style={{ flexDirection: "column", gap: 16, marginBottom: 12 }}
            >
              <TrainingDetailsInfo
                muscles={training.muscles}
                duration={training.duration}
              />

              <EditTrainingDescription
                description={descriptionText}
                setDescription={setDescriptionText}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: fonts.chakraPetchSemiBold,
                  color: colors.fireRed,
                }}
              >
                EXERCISES
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <AddExerciseOrBreak
            setIsAddBreakVisible={setIsAddBreakVisible}
            setIsAddExerciseVisible={setIsAddExerciseVisible}
          />
        }
      />

      <View style={styles.dualButtonContainer}>
        <View style={styles.CancelChangesContainer}>
          <CancelChangesButton
            onPress={() => {
              navigation.navigate("TrainingDetail", { training });
            }}
          />
        </View>
        <GBBigButton
          bgColor={colors.activeYellow}
          icon="editOff"
          onPress={() => {
            // Tutaj logika zapisu całości
          }}
        />
      </View>

      <AddTrainingComponent
        visible={isAddBreakVisible}
        isExercise={false}
        onClose={() => setIsAddBreakVisible(false)}
        onAddBreak={handleAddBreak}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  dualButtonContainer: {
    position: "absolute",
    bottom: 25,
    left: "5%",
    right: "5%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  CancelChangesContainer: {
    flex: 1,
  },
});
