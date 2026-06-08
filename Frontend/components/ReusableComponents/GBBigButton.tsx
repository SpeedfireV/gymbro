import { ColorValue, DimensionValue, TouchableOpacity } from "react-native";

import ArrowBack from "../../assets/icons/arrow_back.svg";

interface GBBigButtonData {
  icon?: React.ReactNode;
  customWidth?: number;
  customHeight?: number;
  iconColor?: ColorValue;
  bgColor: ColorValue;
  onPress: () => void;
}

export function GBBigButton({
  icon,
  customWidth,
  customHeight,
  bgColor,
  onPress,
}: GBBigButtonData) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
        borderRadius: 12,
        padding: 16,
        width: customWidth ?? 64,
        height: customHeight ?? 64,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon ?? <ArrowBack width={32} height={32} />}
    </TouchableOpacity>
  );
}
