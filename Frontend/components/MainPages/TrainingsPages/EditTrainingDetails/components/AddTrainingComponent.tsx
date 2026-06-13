import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../../../../Fonts";
import { colors } from "../../../../../Colors";
import { Icon } from "../../../../../Icons";

interface AddTrainingComponentProps {
  visible: boolean;
  isExercise: boolean;
  exerciseName?: string;
  isRepeating?: boolean;
  onClose: () => void;
  onAddBreak?: (minutes: number, seconds: number) => void;
  onAddExercise?: (
    sets: number,
    reps: number,
    minutes: number,
    seconds: number,
  ) => void;
}

export function AddTrainingComponent({
  visible,
  isExercise,
  exerciseName,
  isRepeating,
  onClose,
  onAddBreak,
  onAddExercise,
}: AddTrainingComponentProps) {
  const [minutes, setMinutes] = useState("3");
  const [seconds, setSeconds] = useState("30");

  const [sets, setSets] = useState("4");
  const [repeats, setReps] = useState("12");

  const handleNumberChange = (text: string, setter: (val: string) => void) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setter(cleaned);
  };

  const handleConfirmBreak = () => {
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;
    if (onAddBreak) onAddBreak(mins, secs);
    onClose();
  };

  const handleConfirmExercise = () => {
    const setsC = parseInt(sets) || 1;
    const reps = parseInt(repeats) || 1;
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;
    if (setsC > 1 || reps > 1) {
      if (onAddExercise) onAddExercise(setsC, reps, mins, secs);
      onClose();
    } else {
      alert("Sets and Reps MUST be more than 1");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.titleRow}>
                <Text style={styles.titleText}>
                  {isExercise ? exerciseName : "NEW BREAK"}
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>

              {isExercise && isRepeating ? (
                <View style={styles.titleRow}>
                  <Text style={styles.titleText}>SETS & REPS</Text>
                </View>
              ) : (
                <View />
              )}

              {isExercise && isRepeating ? (
                <View style={styles.inputContainer}>
                  <View style={styles.inputDual}>
                    <View style={styles.numberBox}>
                      <TextInput
                        style={styles.timeInput}
                        keyboardType="number-pad"
                        maxLength={2}
                        value={sets}
                        onChangeText={(text) =>
                          handleNumberChange(text, setSets)
                        }
                      />
                    </View>
                    <Text style={styles.unitText}>SETS</Text>
                  </View>

                  <View style={styles.inputDual}>
                    <View style={styles.numberBox}>
                      <TextInput
                        style={styles.timeInput}
                        keyboardType="number-pad"
                        maxLength={2}
                        value={repeats}
                        onChangeText={(text) =>
                          handleNumberChange(text, setReps)
                        }
                      />
                    </View>
                    <Text style={styles.unitText}>REPS</Text>
                  </View>
                </View>
              ) : (
                <View />
              )}

              {isExercise ? (
                <View style={styles.titleRow}>
                  <Text style={styles.titleText}>
                    {isRepeating ? "BREAKS" : "TIME"}
                  </Text>
                </View>
              ) : (
                <View />
              )}

              <View style={styles.inputContainer}>
                <View style={styles.inputDual}>
                  <View style={styles.numberBox}>
                    <TextInput
                      style={styles.timeInput}
                      keyboardType="number-pad"
                      maxLength={2}
                      value={minutes}
                      onChangeText={(text) =>
                        handleNumberChange(text, setMinutes)
                      }
                    />
                  </View>
                  <Text style={styles.unitText}>MINUTES</Text>
                </View>

                <View style={styles.inputDual}>
                  <View style={styles.numberBox}>
                    <TextInput
                      style={styles.timeInput}
                      keyboardType="number-pad"
                      maxLength={2}
                      value={seconds}
                      onChangeText={(text) =>
                        handleNumberChange(text, setSeconds)
                      }
                    />
                  </View>
                  <Text style={styles.unitText}>SECONDS</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={
                  isExercise ? handleConfirmExercise : handleConfirmBreak
                }
              >
                <Icon
                  name="add"
                  fill={colors.coffeeBackground}
                  width={32}
                  height={32}
                />
                <Text style={styles.submitButtonText}>
                  {isExercise ? "ADD EXERCISE" : "ADD BREAK"}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  titleText: {
    fontSize: 32,
    color: colors.coffeeBackground,
    fontFamily: fonts.bigShouldersBold,
  },
  closeButton: {
    backgroundColor: "#d33215",
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#FDEFD4",
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputDual: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  numberBox: {
    backgroundColor: "#222222",
    width: 46,
    height: 46,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  timeInput: {
    color: colors.platiniumWhite,
    fontSize: 18,
    fontFamily: fonts.chakraPetchMedium,
    textAlign: "center",
    width: "100%",
    padding: 0,
  },
  unitText: {
    fontSize: 18,
    fontFamily: fonts.chakraPetchSemiBold,
    color: colors.coffeeBackground,
  },
  submitButton: {
    backgroundColor: "#FFB000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    height: 54,
    borderRadius: 12,
    gap: 6,
  },
  submitButtonText: {
    color: colors.coffeeBackground,
    fontSize: 28,
    fontFamily: fonts.bigShouldersExtraBold,
  },
});
