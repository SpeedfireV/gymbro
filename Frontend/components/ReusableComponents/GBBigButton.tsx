import { ColorValue, TouchableOpacity } from "react-native";

import ArrowBack from '../../assets/icons/arrow_back.svg'


interface GBBigButtonData {
  icon?: React.ReactNode,
  bgColor: ColorValue,
  onPress: () => void
}

export function GBBigButton({ icon, bgColor, onPress }: GBBigButtonData) {
  return (<TouchableOpacity onPress={onPress} style={{
    backgroundColor: bgColor,
    borderRadius: 12,
    padding: 16,
  }}>
    {icon ?? <ArrowBack width={32} height={32} />}
  </TouchableOpacity>);
}
