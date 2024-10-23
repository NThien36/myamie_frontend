import { forwardRef } from "react";

interface InputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: "text" | "password" | "email";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  errorMessage?: string;
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
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
        className="p-3 outline-gray-300 w-full border border-gray-200 rounded-md"
      />
      {errorMessage && (
        <p className="text-xs text-red-500 my-1 inline-block">{errorMessage}</p>
      )}
    </div>
  );
});

export default Input;
