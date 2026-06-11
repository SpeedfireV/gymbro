import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { Ionicons } from "@expo/vector-icons";
import { ExerciseItem } from "../../ReusableComponents/ComplexTypes";
import ExerciseCard from "./ExerciseSimpleTile";
import CancelChangesButton from "../../ReusableComponents/CancelChangesButton";
import { GBBigButton } from "../../ReusableComponents/GBBigButton";
import Save from "../../../assets/icons/edit_off.svg";
import { AddTrainingComponent } from "./AddTrainingComponent";
import BreakTile from "./BreakTile";
import { AddExercisePage } from "./AddExercisePage";

export function EditTrainingDetail({
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
        muscule={item.muscle}
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

  const RenderAdderButtons = () => (
    <View style={styles.AdderButtonWrapper}>
      <TouchableOpacity
        style={styles.AdderButton}
        onPress={() => {
          setIsAddExerciseVisible(true);
        }}
        activeOpacity={0.7}
      >
        <Ionicons
          name="add"
          size={22}
          color="#FFB000"
          style={styles.AdderIcon}
        />
        <Text style={styles.AdderText}>Add Exercise</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.AdderButton}
        onPress={() => {
          setIsAddBreakVisible(true);
        }}
        activeOpacity={0.7}
      >
        <Ionicons
          name="add"
          size={22}
          color="#FFB000"
          style={styles.AdderIcon}
        />
        <Text style={styles.AdderText}>Add Break</Text>
      </TouchableOpacity>
    </View>
  );

  return isAddExerciseVisible ? (
    <AddExercisePage
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
        contentContainerStyle={{ paddingBottom: 0 }}
        ListHeaderComponent={
          <>
            <View style={styles.contentUpper}>
              <View style={styles.frameTitleContainer}>
                <TextInput
                  value={titleText}
                  style={styles.titleText}
                  onChangeText={setTitleText}
                />
              </View>
            </View>

            <View style={styles.contentMiddle}>
              <View style={styles.infoFrame}>
                <View style={styles.rightSide}>
                  <Ionicons name="barbell-outline" size={23} color="#ffffff" />
                  <Text style={styles.frameText}>BODY PARTS</Text>
                </View>
                <Text style={styles.justText}>{training.muscles}</Text>
              </View>
              <View style={styles.infoFrame}>
                <View style={styles.rightSide}>
                  <Ionicons name="time-outline" size={23} color="#ffffff" />
                  <Text style={styles.frameText}>TOTAL TRAINING TIME</Text>
                </View>
                <Text style={styles.justText}>{training.duration}</Text>
              </View>
            </View>

            <View style={styles.contentLower}>
              <View style={styles.midTextWraper}>
                <TextInput
                  value={descriptionText}
                  style={styles.frameDescriptionContainer}
                  onChangeText={setDescriptionText}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="center"
                />
              </View>
              <Text style={styles.title}>EXERCISES</Text>
            </View>
          </>
        }
        ListFooterComponent={<RenderAdderButtons />}
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
          bgColor="#FFA500"
          icon={<Save width={32} height={32} />}
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
    backgroundColor: "#000",
  },
  contentUpper: {
    padding: 20,
    marginBottom: 20,
  },
  contentMiddle: {
    padding: 20,
    alignItems: "flex-start",
    gap: 20,
  },
  contentLower: {
    padding: 20,
  },
  infoFrame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  frameText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 8,
  },
  justText: {
    color: "#ffffff",
    fontSize: 13,
    marginLeft: 8,
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  midTextWraper: {
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",

    marginHorizontal: 10,
  },
  midText: {
    marginTop: 18,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20,
  },
  title: {
    marginTop: 20,
    color: "#FF4500",
    fontSize: 32,
    marginBottom: 30,
    fontWeight: "600",
  },
  titleText: {
    color: "#ffffff",
    fontSize: 32,
    width: "100%",
  },

  AdderButtonWrapper: {
    alignItems: "flex-end",
    width: "95%",
    marginTop: 15,
    marginBottom: 100,
  },
  AdderButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 5,
  },
  AdderIcon: {
    marginRight: 4,
  },
  AdderText: {
    color: "#FFB000",
    fontSize: 18,
    fontWeight: "bold",
  },

  frameTitleContainer: {
    flexDirection: "row",
    backgroundColor: "#222222",
    borderColor: "#FFFFFF",
    fontSize: 16,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },

  frameDescriptionContainer: {
    flexDirection: "row",
    backgroundColor: "#222222",
    borderColor: "#FFFFFF",
    fontSize: 20,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
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
  endingMargin: {
    marginBottom: 100,
  },
});
