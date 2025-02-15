import cx from "classnames";
import { Link } from "react-router-dom";

interface ButtonProps {
  variant?: "solid" | "outline" | "ghost";
  id?: string;
  shape?: "rectangle" | "rounded";
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  padding?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

function Button({
  variant = "solid",
  shape = "rectangle",
  children,
  onClick,
  disabled = false,
  padding = "px-3 py-2",
  type = "button",
  className,
  to,
  id,
}: ButtonProps) {
  const baseStyles = "transition-color duration-300 border-2 whitespace-nowrap";

  const variants = {
    solid: "text-white bg-primary border-primary hover:bg-opacity-90",
    outline: "text-primary border-primary bg-primary-lighter hover:bg-white",
    ghost: "bg-white border-gray-200 hover:border-gray-500",
  };

  const shapes = {
    rectangle: "rounded-md",
    rounded: "rounded-full",
  };

  const isDisabled = disabled ? "opacity-50 cursor-not-allowed" : "";

  const classes = cx(
    padding,
    baseStyles,
    variants[variant],
    shapes[shape],
    isDisabled,
    className
  );

  if (to) {
    // If href is provided, render an anchor tag
    return (
      <Link id={id} to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
