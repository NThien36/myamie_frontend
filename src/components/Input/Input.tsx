import { forwardRef, useState } from "react";

interface InputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string | number | undefined;
  type?: "text" | "password" | "email" | "number" | "date";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
  hidden?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      readonly,
      errorMessage,
      className,
      disabled = false,
      hidden = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label htmlFor={id} className="mb-2 block font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={showPassword && type === "password" ? "text" : type}
            placeholder={placeholder}
            defaultValue={value}
            onChange={onChange}
            readOnly={readonly}
            disabled={disabled}
            hidden={hidden}
            className="p-3 outline-gray-300 w-full border border-gray-200 rounded-md"
            {...rest}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-0 bottom-0 text-gray-400 hover:text-gray-700"
            >
              <i className="fa-lg fa-regular fa-eyes"></i>
            </button>
          )}
        </div>
        {errorMessage && (
          <p
            id={`${id}-error`}
            className="text-xs text-red-500 mt-1.5 inline-block"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
