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
    <div className={cx(className, "flex items-center gap-3")}>
      <div className={cx(iconClasses, "flex justify-center flex-none")}>
        <i className={cx("fa-regular", icon)}></i>
      </div>
      <p className={cx(textClasses, "text-wrap")}>{text}</p>
    </div>
  );
}

export default IconText;
