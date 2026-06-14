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


    const updatedList = exercisesList.map((item, index) => {
      if (index === exercisesList.length - 1) {
        return {
          ...item,
          break_after: totalDurationString,
        };
      }
      return item;
    });

    setExercisesList(updatedList);
  };

  const renderItem = ({ item }: { item: ExerciseItem }) =>
    /[1-9]/.test(item.break_after) ? (
      <View >
        <ExerciseCard
          name={item.exercise.name}
          muscle={item.exercise.muscule}
          sitsreps={item.sets + "x" + item.reps}
          duration={item.duration}
          order={item.order}
          editable={true}
          onDelete={() => handleDeleteExercise(item.index)}
          innerBreakDuration={item.break_between}
          isRepeating={item.exercise.type == "reps"}
        />

        <BreakTile
          editable={true}
          duration={item.break_after}
          onDelete={() => handleDeleteBreak(item.index)}
        />
      </View>
    ) : (
        <ExerciseCard
          name={item.exercise.name}
          muscle={item.exercise.muscule}
          sitsreps={item.sets + "x" + item.reps}
          duration={item.duration}
          order={item.order}
          editable={true}
          onDelete={() => handleDeleteExercise(item.index)}
          innerBreakDuration={item.break_between}
          isRepeating={item.exercise.type == "reps"}
        />
    );


  const handleDeleteBreak = (idToBreakRemove: string) => {
    const updatedList = exercisesList.map((item) => {
    if (item.index === idToBreakRemove) {
      return {
        ...item,
        break_after: "00:00"
      };
    }

    return item;
  });

  setExercisesList(updatedList);
  };


  const handleDeleteExercise = (idToRemove: string) => {
    const filteredList = exercisesList.filter((item) => item.index !== idToRemove);
    console.log("EnteredDeleter");
    let currentOrder = 1;

    const updatedList = filteredList.map((item) => {
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
        keyExtractor={(item) => item.index}
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
