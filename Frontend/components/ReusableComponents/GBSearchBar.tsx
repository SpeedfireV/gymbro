import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholderText: string,
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export function GBSearchBar({ placeholderText, searchQuery, setSearchQuery }: SearchBarProps) {

  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        placeholder={placeholderText}
        placeholderTextColor="#EFF1F3BF"

        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Ionicons
        name="search-outline"
        size={24}
        color="#FFF"
        style={styles.searchIcon}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272727',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 4,
    height: 64,
    paddingHorizontal: 15,
    marginBottom: 20,

  },
  input: {
    flex: 1,
    color: '#EFF1F3',
    fontSize: 18,
    fontFamily: "ChakraPetch-ExtraLight"
  },
  searchIcon: {
    marginLeft: 10,
  },
});
