interface TextareaProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readonly?: boolean;
}

function Textarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  readonly,
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block font-medium">
          {label}
        </label>
      )}
      <textarea
        rows={7}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
        className="p-3 outline-gray-300 w-full border border-gray-200 rounded-md"
      />
    </div>
  );
}

export default Textarea;
