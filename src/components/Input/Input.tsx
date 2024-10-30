import { forwardRef, useState } from "react";

interface InputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: "text" | "password" | "email" | "number" | "date";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  errorMessage?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  id,
  label,
  placeholder,
  value,
  type = "text",
  onChange,
  readonly,
  errorMessage,
  className,
}: InputProps) {
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
          id={id}
          type={showPassword && type === "password" ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readonly}
          className="p-3 outline-gray-300 w-full border border-gray-200 rounded-md"
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
        <p className="text-xs text-red-500 my-1 inline-block">{errorMessage}</p>
      )}
    </div>
  );
});

export default Input;
