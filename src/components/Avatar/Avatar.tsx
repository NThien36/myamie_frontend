import { noAvatar } from "@/assets/images";
import cx from "classnames";

interface AvatarProps {
  src: string;
  alt: string;
  size?: string;
  className?: string;
  hasBorder?: boolean;
  onClick?: () => void;
}

function Avatar({
  src,
  alt,
  size = "size-16",
  className,
  hasBorder = true,
  onClick,
}: AvatarProps) {
  const avatarClasses = cx(
    "rounded-full object-cover relative",
    size,
    className,
    {
      "border-4 border-background": hasBorder,
    }
  );

  return (
    <img
      onClick={onClick}
      src={src ? src : noAvatar}
      alt={alt}
      className={avatarClasses}
    />
  );
}

export default Avatar;
