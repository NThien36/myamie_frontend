import cx from "classnames";

interface IconBtnProps {
  onClick?: () => void;
  icon: string;
  className?: string;
  hasBackground?: boolean;
}

function IconBtn({
  onClick,
  icon,
  className,
  hasBackground = true,
}: IconBtnProps) {
  const buttonClasses = cx(
    "rounded-full size-8",
    {
      "hover:bg-gray-200 transition-colors": hasBackground,
    },
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick}>
      <i className={cx("fa-lg fa-regular", icon)}></i>
    </button>
  );
}

export default IconBtn;
