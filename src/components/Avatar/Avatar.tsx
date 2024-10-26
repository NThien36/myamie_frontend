import { noAvatar } from "@/assets/images";
import cx from "classnames";

interface AvatarProps {
  src: string;
  alt: string;
  size?: string;
  className?: string;
  hasBorder?: boolean;
}

function Avatar({
  src,
  alt,
  size = "size-16",
  className,
  hasBorder = true,
}: AvatarProps) {
  const avatarClasses = cx(
    "rounded-full object-cover relative",
    size,
    className,
    {
      "border-4 border-white": hasBorder,
    }
  );

  return <img src={src ? src : noAvatar} alt={alt} className={avatarClasses} />;
}

export default Avatar;
