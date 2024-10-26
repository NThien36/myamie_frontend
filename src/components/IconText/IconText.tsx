import cx from "classnames";

interface IconTextProps {
  icon: string;
  iconClasses?: string;
  text: string;
  textClasses?: string;
  className?: string;
}

function IconText({
  icon,
  iconClasses,
  text,
  textClasses,
  className,
}: IconTextProps) {
  return (
    <div className={cx(className, "flex items-center gap-2")}>
      <div className={cx(iconClasses, "flex justify-center")}>
        <i className={cx("fa-regular", icon)}></i>
      </div>
      <p className={cx(textClasses, "whitespace-nowrap")}>{text}</p>
    </div>
  );
}

export default IconText;
