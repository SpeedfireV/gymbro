import EditOff from "./assets/icons/edit_off.svg";
import Sports from "./assets/icons/sports.svg";
import Delete from "./assets/icons/delete.svg";
import Star from "./assets/icons/star.svg";
import ArrowLeft from "./assets/icons/arrow_left.svg";
import ArrowRight from "./assets/icons/arrow_right.svg";
import Add from "./assets/icons/add.svg";
import { SvgProps } from "react-native-svg";

const ICONS = {
  editOff: EditOff,
  sports: Sports,
  delete: Delete,
  star: Star,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  add: Add,
} as const;

export type IconName = keyof typeof ICONS;

interface IconProps extends SvgProps {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const SvgIcon = ICONS[name];

  if (!SvgIcon) return null;

  return <SvgIcon {...props} />;
};
