import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { colors } from "../../Colors";
import { Icon } from "../../Icons";

interface SearchBarProps {
  placeholderText: string;
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export function GBSearchBar({
  placeholderText,
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        placeholder={placeholderText}
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
  },
  input: {
    flex: 1,
    color: colors.platiniumWhite,
    fontSize: 18,
    fontFamily: "ChakraPetch-ExtraLight",
  },
  searchIcon: {
    marginLeft: 10,
  },
});
