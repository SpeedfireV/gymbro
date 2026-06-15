import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import EditAddHeader from "../../ReusableComponents/EditAddHeader";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../Colors";
import { fonts } from "../../../Fonts";
import { createCalendarEvent } from "./createNewCalendarEvent"

export function DateSelector({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "DateSelector">) {
  const { training } = route.params;
  const [repeat, setRepeat] = useState("Never Repeats");
  const [customRepeat, setCustomRepeat] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const possibleRepeats = ["Never Repeats", "Every Day", "Every Week", "Other"];

  const handleDateChange = (text: string) => {
    let cleaned = text.replace(/\D/g, "");
    if (cleaned.length > 2 && cleaned.length <= 4) {
      cleaned = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      cleaned = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 4)}.${cleaned.slice(4, 8)}`;
    }

    setDate(cleaned);
  };

  const handleRepeatChange = (text: string) => {
    let digits = text.replace(/\D/g, "");

    if (
      text.length < customRepeat.length &&
      digits === customRepeat.replace(/\D/g, "")
    ) {
      digits = digits.slice(0, -1);
    }

    const cleaned = digits.slice(0, 4);
    if (
      cleaned === "" ||
      cleaned === "0" ||
      cleaned === "00" ||
      cleaned === "000" ||
      cleaned === "0000"
    ) {
      setCustomRepeat(cleaned);
    } else {
      const num = parseInt(cleaned);
      if (num === 1) {
        setCustomRepeat(`${num} day`);
      } else {
        setCustomRepeat(`${num} days`);
      }
    }
  };

  const handleCreateTraining = async () => {
    if (date.length !== 10) {
      alert("Please enter a full date (DD.MM.YYYY)");
      return;
    }
    const [d, m, y] = date.split(".").map(Number);
    const inputDate = new Date(y, m - 1, d);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (m < 1 || m > 12) {
      alert("Month must be between 1 and 12");
      return;
    }

    if (inputDate < today || y > 2184) {
      alert("Year must be between today and 2184");
      return;
    }

    const daysInMonth = new Date(y, m, 0).getDate();
    if (d < 1 || d > daysInMonth) {
      alert(`This month has only ${daysInMonth} days!`);
      return;
    }

    if (inputDate < today) {
      alert("You cannot plan a training in the past!");
      return;
    }

    console.log("Data valid:", {
      trainingId: training.id,
      plannedDate: date,
      repeatOption: repeat,
      notes: notes,
    });

    const formattedMonth = m < 10 ? `0${m}` : `${m}`;
    const formattedDay = d < 10 ? `0${d}` : `${d}`;
    const isoDbDate = `${y}-${formattedMonth}-${formattedDay}T12:00:00Z`;

    let dbRepeat = "none";
    if (repeat === "Every Day") dbRepeat = "daily";
    if (repeat === "Every Week") dbRepeat = "weekly";
    if (repeat === "Other") dbRepeat = "custom"; 

    const payload = {
      workout: parseInt(training.id),
      utc_time: isoDbDate,
      time_begin: "12:00:00",
      event_type: "workout", 
      title: training.title || "Planned Workout",
      description: notes || training.description || "",
      repeat: dbRepeat
    };

    console.log("Sending event to backend:", payload);

    const success = await createCalendarEvent(payload);

    if (success) {
      alert("Training planned successfully!");
      navigation.navigate("Home");
    } else {
      alert("Something went wrong while planning the training. Check console.");
    }

      navigation.navigate("Home");
    };

  const toggleChoice = (choice: string) => {
    if (possibleRepeats.includes(choice)) {
      setRepeat(choice);
    } else {
      console.error("Toggle Failed! Wrong choice provided.");
      setRepeat("Never Repeats");
    }
  };

  const renderOtherRepeateChoice = () => {
    return (
      <View style={styles.inputWrapper}>
        <Ionicons
          name="calendar-outline"
          size={22}
          color="#FFF"
          style={styles.icon}
        />
        <TextInput
          style={styles.inputText}
          value={customRepeat}
          onChangeText={handleRepeatChange}
          keyboardType="number-pad"
          placeholderTextColor="#666"
          placeholder="How often will repeat"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentUpper}>
        <EditAddHeader
          title="PLAN DETAILS"
          onBack={() => navigation.goBack()}
          showDelete={false}
        />
      </View>

      <View style={styles.contentLower}>
        <View style={styles.inputSection}>
          <ScrollView
            style={styles.choiceWrapper}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {possibleRepeats.map((choice) => {
              return (
                <TouchableOpacity
                  key={choice}
                  style={[
                    styles.choiceTile,
                    choice === repeat && styles.choiceTileActive,
                  ]}
                  onPress={() => toggleChoice(choice)}
                >
                  <Text
                    style={[
                      styles.label,
                      choice === repeat && styles.labelActive,
                    ]}
                  >
                    {choice}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {repeat == "Other" && (
            <Text style={styles.label}>
              How many days, between two trainings?
            </Text>
          )}
          {repeat == "Other" && renderOtherRepeateChoice()}

          <Text style={styles.label}>Training Date</Text>
          <View style={{ flexDirection: "column", gap: 32 }}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="calendar-number-outline"
                size={22}
                color="#FFF"
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                value={date}
                keyboardType="number-pad"
                onChangeText={handleDateChange}
                placeholder="DD.MM.YYYY"
                placeholderTextColor={colors.platiniumWhiteOpacity}
              />
            </View>
            <View>
              <Text style={styles.label}>Notes</Text>
              <View style={[styles.inputWrapper, styles.notesWrapper]}>
                <TextInput
                  style={[styles.inputText, styles.notesInput]}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="If you have something to say..."
                  placeholderTextColor={colors.platiniumWhiteOpacity}
                  multiline={true}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleCreateTraining()}
        >
          <Text style={styles.saveButtonText}>CREATE TRAINING</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentUpper: {
    flex: 0.4,
    padding: 20,
  },
  contentLower: {
    flex: 0.9,
    padding: 20,
  },
  buttonContainer: {
    flex: 0.35,
    paddingVertical: 16,
    marginHorizontal: 24,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: colors.platiniumWhite,
    marginBottom: 8,
    fontFamily: fonts.bigShouldersMedium,
    fontSize: 24,
  },
  labelActive: {
    color: "#000",
  },
  selectedTrainingPreview: {
    marginBottom: 30,
  },
  inputSection: {
    marginBottom: 20,
  },
  choiceWrapper: {
    marginBottom: 30,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#FFA500",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 40,
  },
  saveButtonText: {
    fontFamily: fonts.bigShouldersExtraBold,
    color: colors.coffeeBackground,
    fontSize: 28,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 60,
  },
  icon: {
    marginRight: 15,
  },
  inputText: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "ChakraPetch-Medium",
  },
  notesWrapper: {
    height: 120,
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  notesInput: {
    height: "100%",
  },
  choiceTile: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 0,
    borderRadius: 10,
    borderColor: "#444",
    borderWidth: 2,
    marginRight: 5,
    backgroundColor: "#1A1A1A",
  },
  choiceTileActive: {
    backgroundColor: "#FFA500",
    borderColor: "#dd9944",
  },
});
