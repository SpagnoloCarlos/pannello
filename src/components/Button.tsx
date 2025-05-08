interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
}

const Button = ({ variant = "primary", className = "", children, ...props }: ButtonProps) => {
  const variantClasses = {
    primary: "bg-emerald-900 hover:bg-emerald-900/80 text-white",
    secondary: "bg-red-800 hover:bg-red-800/80 text-white",
    tertiary: "bg-gray-800 hover:bg-gray-800/80 text-white",
  };

  return (
    <button
      className={`flex items-center justify-center py-2 px-4 rounded-md cursor-pointer transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
