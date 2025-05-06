interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ id, label, error, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className={`p-2 border rounded-md outline outline-transparent ${error ? "border-red-500" : "border-gray-400"} transition-colors duration-200 ${error ? "focus-visible:border-red-500" : "focus-visible:border-gray-200"} ${error ? "focus-visible:outline-red-500" : "focus-visible:outline-gray-200"}`}
        {...props}
      />
      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
};

export default Input;
