import { noAvatar } from "@/assets/images";
import getImageUrl from "@/utils/getImageUrl";
import cx from "classnames";

interface AvatarProps {
  src: string | undefined;
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
    "rounded-full object-cover relative flex-none",
    size,
    className,
    {
      "border-4 border-background": hasBorder,
    }
  );

  return (
    <img
      onClick={onClick}
      src={getImageUrl(src, "avatar")}
      alt={alt}
      className={avatarClasses}
    />
  );
}

export default Avatar;
