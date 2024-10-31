import cx from "classnames";

interface IconBtnProps {
  onClick?: () => void;
  icon: string;
  className?: string;
  hasBackground?: boolean;
  iconSize?: string;
  size?: string;
  effect?: "default" | "opacity" | "scale";
}

function IconBtn({
  onClick,
  icon,
  className,
  iconSize = "fa-lg",
  size = "size-8",
  effect = "default",
}: IconBtnProps) {
  const effectClasses = {
    default: "hover:bg-gray-200",
    opacity:
      "border-2 border-white bg-black bg-opacity-35 hover:bg-opacity-50 text-white",
    scale: "hover:scale-110",
  };

  const buttonClasses = cx(
    "rounded-full flex-none transition-all duration-300",
    effectClasses[effect],
    size,
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick}>
      <i className={cx("fa-regular", iconSize, icon)}></i>
    </button>
  );
}

export default IconBtn;
