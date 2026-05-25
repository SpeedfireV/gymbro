import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface TabButtonData {
  title: string,
  enabled: boolean,
  onSelect: () => void,
}

export function TabButton({ title, enabled, onSelect }: TabButtonData) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={enabled ? styles.enabledTabButton : styles.disabledTabButton} onPress={onSelect}>
        <Text style={enabled ? styles.enabledTabButtonText : styles.disabledTabButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  enabledTabButtonText: {
    fontSize: 24,
    fontFamily: 'BigShoulders-Bold',
    color: "#322214",
  },
  enabledTabButton: {
    backgroundColor: "#FBAF00",
    borderRadius: 4,
    height: 60,
    justifyContent: "center",
    textAlign: 'center',
    alignItems: 'center'
  },
  disabledTabButtonText: {
    fontSize: 24,
    fontFamily: 'BigShoulders-Medium',
    fontWeight: 'medium',
    color: "#EFF1F3",
  },
  disabledTabButton: {
    borderWidth: 2,
    borderColor: '#FBAF00',
    backgroundColor: "#242423",
    borderRadius: 4,
    height: 60,
    justifyContent: "center",
    textAlign: 'center',
    alignItems: 'center'
  }
});
