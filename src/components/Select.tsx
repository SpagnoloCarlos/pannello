import { useState, useRef, useEffect } from "react";
import SelectArrowIcon from "./Icons/SelectArrowIcon";

interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
}

const Select = ({
  id,
  label,
  error,
  options,
  onChange,
  value,
  disabled,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() => {
    const option = options.find((opt) => opt.value === value);
    return option || options[0];
  });
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const option = options.find((opt) => opt.value === value);
    if (option) {
      setSelectedOption(option);
    }
  }, [value, options]);

  const handleSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <div ref={selectRef} className="relative">
        <div
          className={`p-2 border rounded-md outline outline-transparent cursor-pointer select-none
            ${error ? "border-red-500" : "border-gray-400"} 
            ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            transition-colors duration-200 
            ${error ? "focus-visible:border-red-500" : "focus-visible:border-gray-400"}
            ${error ? "focus-visible:outline-red-500" : "focus-visible:outline-gray-400"}
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-options`}
          {...props}
        >
          <div className="flex items-center justify-between">
            <span>{selectedOption?.label}</span>
            <SelectArrowIcon isOpen={isOpen} />
          </div>
        </div>
        {isOpen && !disabled && (
          <ul
            id={`${id}-options`}
            className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-400 rounded-md shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`p-2 cursor-pointer hover:bg-gray-950 ${
                  selectedOption.value === option.value ? "bg-gray-950" : ""
                }`}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={selectedOption.value === option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
};

export default Select;
