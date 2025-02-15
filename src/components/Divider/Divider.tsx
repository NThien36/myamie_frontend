type DividerProps = {
  height?: string;
  width?: string;
  orientation?: "vertical" | "horizontal";
  className?: string;
};

function Divider({
  height = "h-auto",
  width = "w-full",
  orientation = "vertical",
  className = "",
}: DividerProps) {
  const orientationClass =
    orientation === "vertical" ? `border-l ${height}` : `border-t ${width}`;

  return <div className={` ${className} ${orientationClass} `}></div>;
}

export default Divider;
