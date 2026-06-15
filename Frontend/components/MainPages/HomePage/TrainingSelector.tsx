import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { TrainingItem } from "../../ReusableComponents/ComplexTypes";
import EditAddHeader from "../../ReusableComponents/EditAddHeader";
import TrainingCard from "../TrainingsPages/TrainingsPage/components/TrainingCard";
import { Icon } from "../../../Icons";
import { colors } from "../../../Colors";
import { dummyTrainings } from "../TrainingsPages/TrainingsPage/DummyTrainingsData";
import { GBSearchBar } from "../../ReusableComponents/GBSearchBar";
import { fetchUserWorkouts } from "../../ReusableComponents/FetchWorkouts";

export function TrainingSelector({
  navigation,
}: StackScreenProps<RootStackParamList, "TrainingSelector">) {
  const [searchQuery, setSearchQuery] = useState("");
  const [realTrainings, setRealTrainings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const loadWorkouts = async () => {
        setIsLoading(true);
        const rawWorkouts = await fetchUserWorkouts();
        console.log("RAW DATA:", rawWorkouts);
  
        const mappedTrainings: TrainingItem[] = rawWorkouts.map((workout: any) => ({
          id: String(workout.id),
          title: workout.name || "No name training",
          description: workout.description || "",
          
          muscles: workout.muscles && workout.muscles.length > 0 
            ? workout.muscles.map((m: string) => m.charAt(0).toUpperCase() + m.slice(1)).join(", ")
            : "Ogólnorozwojowy",
            
          time: workout.total_duration || "00:00:00",
          exercisesCount: workout.exercises_count || 0,
          duration: workout.total_duration || "00:00:00",
          exercises: workout.exercises || [],
          isPublic: workout.is_public || false,
        }));
  
        console.log("ITS OPERATIONAL!", mappedTrainings);
        setRealTrainings(mappedTrainings);
        setIsLoading(false);
      };
  
      loadWorkouts();
    }, []);

  const renderItem = ({ item }: { item: TrainingItem }) => (
    <TrainingCard
      item={item}
      description={item.description}
      showPublicity={true}
      onSelect={(training) => navigation.navigate("DateSelector", { training })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={realTrainings}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <EditAddHeader
              title={"SELECT TRAINING"}
              onBack={() => navigation.navigate("Home")}
              showDelete={false}
              onDelete={() => {}}
            />
            <GBSearchBar
              placeholderText="Find Training"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </View>
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          marginTop: 24,
          marginHorizontal: 24,
        }}
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
