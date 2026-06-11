import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../Colors";
import { fonts } from "../../../../Fonts";
import { Icon } from "../../../../Icons";

interface TrainingsSearchBarData {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export default function TrainingsSearchBar({
  searchQuery,
  setSearchQuery,
}: TrainingsSearchBarData) {
  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        placeholder="Find Training"
        placeholderTextColor={colors.platiniumWhiteOpacity}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Icon name="search" fill={colors.platiniumWhite} width={32} height={32} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.platiniumWhite,
    borderRadius: 4,
    height: 64,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginHorizontal: 24,
  },
  input: {
    flex: 1,
    color: colors.platiniumWhite,
    fontFamily: fonts.chakraPetchExtraLight,
    fontSize: 18,
  },
  searchIcon: {
    marginLeft: 10,
  },
});
