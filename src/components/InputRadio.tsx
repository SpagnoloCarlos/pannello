interface InputRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  defaultValue?: string;
}

const InputRadio = ({ id, label, error, options, defaultValue, ...props }: InputRadioProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <div className="flex gap-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              id={`${id}-${option.value}`}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              className={`w-4 h-4 border cursor-pointer ${
                error ? "border-red-500" : "border-gray-400"
              } transition-colors duration-200 ${
                error ? "focus-visible:outline-red-500" : "focus-visible:outline-gray-200"
              }`}
              {...props}
            />
            <label htmlFor={`${id}-${option.value}`} className="text-sm cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default InputRadio;
