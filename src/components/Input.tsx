import { useState } from "react";
import EyeOffIcon from "./Icons/EyeOffIcon";
import EyeIcon from "./Icons/EyeIcon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ id, label, error, type, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      <label
        className={`text-sm ${props.required ? "after:ml-0.5 after:text-red-500 after:content-['*']" : ""}`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`p-2 border rounded-md outline outline-transparent ${error ? "border-red-500" : "border-gray-400"} transition-colors duration-200 ${error ? "focus-visible:border-red-500" : "focus-visible:border-gray-200"} ${error ? "focus-visible:outline-red-500" : "focus-visible:outline-gray-200"}`}
        type={showPassword ? "text" : type}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          className="m-0 p-1 border-none outline-none flex items-center justify-center absolute top-8 right-2 bg-gray-950 rounded-full cursor-pointer"
          onClick={handleShowPassword}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      )}
      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
};

export default Input;
