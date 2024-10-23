import { noAvatar } from "@/assets/images";
import cx from "classnames";

interface AvatarProps {
  src: string;
  alt: string;
  size?: string;
  className?: string;
}

function Avatar({ src, alt, size = "size-16", className }: AvatarProps) {
  const avatarClasses = cx(
    "rounded-full object-cover border-4 border-white relative",
    size,
    className
  );

  return <img src={src ? src : noAvatar} alt={alt} className={avatarClasses} />;
}

export default Avatar;
