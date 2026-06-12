import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fonts } from "../../Fonts";
import { colors } from "../../Colors";
import { Icon } from "../../Icons";

interface EditAddHeaderProps {
  title: string;
  onBack: () => void;
  showDelete?: boolean;
  onDelete?: () => void;
}

const EditAddHeader = ({
  title,
  onBack,
  showDelete,
  onDelete,
}: EditAddHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Icon name="arrowLeft" fill={colors.platiniumWhite} />
      </TouchableOpacity>

      <View style={styles.titleWrapper}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title.toUpperCase()}
        </Text>
      </View>

      <View style={styles.rightActionWrapper}>
        {showDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Icon
              name="delete"
              fill={colors.platiniumWhite}
              width={32}
              height={32}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
    height: 60,
  },
  backButton: {
    backgroundColor: colors.activeYellow,
    borderRadius: 12,
    marginRight: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: {
    flex: 1,
  },
  headerTitle: {
    color: colors.platiniumWhite,
    fontSize: 36,
    fontFamily: fonts.bigShouldersBlack,
  },
  rightActionWrapper: {
    width: 45,
    alignItems: "flex-end",
  },
  deleteButton: {
    backgroundColor: "#c4200e",
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditAddHeader;
