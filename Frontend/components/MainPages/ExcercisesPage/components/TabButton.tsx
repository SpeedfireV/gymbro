import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface TabButtonData {
  title: string,
  enabled: boolean,
}

export function TabButton({ title, enabled }: TabButtonData) {
  return (
    <View>
      <TouchableOpacity style={enabled ? styles.enabledTabButton : styles.disabledTabButton} onPress={() => { }}>
        <Text style={enabled ? styles.enabledTabButtonText : styles.disabledTabButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  enabledTabButtonText: {
    fontSize: 24,
    fontFamily: 'BigShoulders',
    fontWeight: '900',
    color: "#322214",
  },
  enabledTabButton: {
    backgroundColor: "#FBAF00",
    borderRadius: 4,
  },
  disabledTabButtonText: {
    fontSize: 24,
    fontFamily: 'BigShoulders',
    fontWeight: '900',
    color: "#EFF1F3",
  },
  disabledTabButton: {
    borderWidth: 2,
    borderColor: '#FBAF00',
    backgroundColor: "#242423",
    borderRadius: 4,
  }
});
