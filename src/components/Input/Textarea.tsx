import { forwardRef } from "react";

interface TextareaProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
  errorMessage?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      value,
      onChange,
      readonly,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-2 block font-medium">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={7}
          id={id}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
          readOnly={readonly}
          className="p-3 outline-gray-300 w-full border border-gray-200 rounded-md"
          {...rest}
        />
        {errorMessage && (
          <p className="text-xs text-red-500 mt-1.5 inline-block">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export default Textarea;
