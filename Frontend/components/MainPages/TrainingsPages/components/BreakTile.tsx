import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BreakTileProps {
  duration: string;
  editable: boolean;
  onDelete?: () => void;
}

export default function BreakTile({
  duration,
  editable,
  onDelete,
}: BreakTileProps) {
  return (
    <View style={editable ? styles.container : styles.containerWhite}>
      <View style={editable ? styles.breakFrame : styles.breakFrameWhite}>
        <Ionicons
          name="time-outline"
          size={24}
          color={editable ? "#ffffff" : "#000000"}
          style={editable ? styles.icon : styles.iconWhite}
        />
        <Text style={editable ? styles.breakText : styles.breakTextWhite}>
          {duration} BREAK
        </Text>
      </View>

      {editable ? (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={22} color="#ffffff" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  breakFrame: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 6,
    backgroundColor: "#222222",
    height: 50,
    marginRight: 15,
    shadowColor: "#FFA500",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    marginRight: 8,
  },
  breakText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  deleteButton: {
    backgroundColor: "#d33215",
    width: 46,
    height: 46,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  containerWhite: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
  },
  breakFrameWhite: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 6,
    backgroundColor: "#ECF0F3",
    height: 50,
    marginRight: 15,

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconWhite: {
    marginRight: 8,
    color: "#2D241E",
  },
  breakTextWhite: {
    color: "#2D241E",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
