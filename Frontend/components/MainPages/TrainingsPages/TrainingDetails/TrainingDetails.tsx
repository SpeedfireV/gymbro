import React, { useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";
import EditAddHeader from "../../../ReusableComponents/EditAddHeader";
import { ExerciseItem } from "../../../ReusableComponents/ComplexTypes";
import ExerciseCard from "../ExerciseCard";
import PublishToBroScienceButton from "../../../ReusableComponents/PublishToBroScienceButton";
import { GBBigButton } from "../../../ReusableComponents/GBBigButton";
import BreakTile from "../BreakTile";
import TrainingDetailsInfo from "./components/TrainingDetailsInfo";
import { colors } from "../../../../Colors";
import { fonts } from "../../../../Fonts";

export function TrainingDetails({
  route,
  navigation,
}: StackScreenProps<RootStackParamList, "TrainingDetail">) {
  const { training } = route.params;

  const renderItem = ({ item }: { item: ExerciseItem }) =>
    item.type === "exercise" ? (
      <ExerciseCard
        name={item.name}
        muscle={item.muscle}
        detail={item.detail}
        order={item.order}
        editable={false}
        innerBreakDuration={item.innerBreakDuration}
        isRepeating={item.isRepeating}
      />
    ) : (
      <BreakTile editable={false} duration={item.detail} />
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={training.exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: 24 }}
        ListHeaderComponent={
          <View>
            <View style={styles.contentUpper}>
              <EditAddHeader
                title={training.title}
                onBack={() => navigation.navigate("Training")}
                onDelete={() => {}}
                showDelete={true}
              />
            </View>
            <TrainingDetailsInfo
              muscles={training.muscles}
              duration={training.duration}
              description={training.description}
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
        }
        ListFooterComponent={<View style={styles.endingMargin} />}
      />

      <View style={styles.dualButtonContainer}>
        <View style={styles.BroScienceContainer}>
          <PublishToBroScienceButton onPress={() => {}} />
        </View>
        <GBBigButton
          bgColor={colors.activeYellow}
          icon="edit"
          iconColor={colors.coffeeBackground}
          onPress={() => {
            navigation.navigate("EditTrainingDetail", { training });
          }}
        />
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
    marginTop: 24,
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
    fontSize: 23,
    marginLeft: 8,
  },
  justText: {
    color: "#ffffff",
    fontSize: 23,
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

  dualButtonContainer: {
    position: "absolute",
    bottom: 25,
    left: "5%",
    right: "5%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  BroScienceContainer: {
    flex: 1,
  },
  endingMargin: {
    marginBottom: 100,
  },
});
