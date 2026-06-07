import { ColorValue, TouchableOpacity } from "react-native";

import ArrowBack from '../../assets/icons/arrow_back.svg'


interface GBSmallButtonData {
  icon?: React.ReactNode,
  bgColor: ColorValue,
  onPress: () => void
}

export function GBSmallButton({ icon, bgColor, onPress }: GBSmallButtonData) {
  return (<TouchableOpacity onPress={onPress} style={{
    backgroundColor: bgColor,
    borderRadius: 12,
    padding: 12,
  }}>
    {icon ?? <ArrowBack width={24} height={24} />}
  </TouchableOpacity>);
}
