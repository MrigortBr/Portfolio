import { IconType } from "react-icons";
import { IconWrapper } from "./style";
import { Tooltip } from "../ActivityBar/style";

type IconProps = {
  icon: IconType;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  title: string;
};

export default function CustomIcon({
  icon: Icon,
  className,
  onClick,
  title,
}: IconProps) {
  return (
    <IconWrapper className={className} onClick={onClick}>
      <Icon />
      <Tooltip>{title}</Tooltip>
    </IconWrapper>
  );
}
