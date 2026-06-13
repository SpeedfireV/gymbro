import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../../Colors";
import { fonts } from "../../Fonts";
import { Icon, IconName } from "../../Icons";

interface TextInputWithTitleData {
  fieldTitle: string;
  onChangeText: (text: string) => void;
  value: string;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  suffixIcon?: IconName;
  suffixIconOnPress?: () => void;
  suffixIconColor?: string;
}

export default function TextInputWithTitle({
  fieldTitle,
  onChangeText: setTextFunc,
  value = "",
  placeholder = "",
  multiline = false,
  autoCapitalize = "sentences",
  secureTextEntry = false,
  suffixIcon,
  suffixIconOnPress,
  suffixIconColor = "#aaa",
}: TextInputWithTitleData) {
  return (
    <View style={{ flex: multiline ? 1 : undefined }}>
      <Text
        style={{
          fontSize: 24,
          fontFamily: fonts.bigShouldersMedium,
          color: colors.platiniumWhite,
          marginBottom: 8,
        }}
      >
        {fieldTitle}
      </Text>

      <View style={[styles.frameContainer, multiline && { flex: 1 }]}>
        <TextInput
          style={multiline ? styles.multilineInput : styles.singleLineInput}
          multiline={multiline}
          onChangeText={setTextFunc}
          placeholder={placeholder}
          placeholderTextColor={colors.platiniumWhiteOpacity}
          value={value}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />

        {suffixIcon && (
          <TouchableOpacity onPress={suffixIconOnPress}>
            <Icon
              name={suffixIcon}
              width={32}
              height={32}
              color={suffixIconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frameContainer: {
    flexDirection: "row",
    backgroundColor: colors.inputBackground,
    borderColor: colors.platiniumWhite,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5,
    paddingRight: 16,
    alignItems: "center",
    width: "100%",
  },
  multilineInput: {
    flex: 1,
    minHeight: 64,
    fontFamily: fonts.chakraPetchExtraLight,
    color: colors.platiniumWhite,
    fontSize: 18,
    paddingLeft: 16,
    paddingTop: 16,
    textAlignVertical: "top",
    textAlign: "left",
  },
  singleLineInput: {
    flex: 1,
    minHeight: 64,
    fontFamily: fonts.chakraPetchExtraLight,
    color: colors.platiniumWhite,
    fontSize: 18,
    paddingLeft: 16,
  },
});
