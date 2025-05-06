interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
}

const Button = ({ variant = "primary", className = "", children, ...props }: ButtonProps) => {
  const variantClasses = {
    primary: "bg-sky-800 hover:bg-sky-800/80 text-white",
    secondary: "bg-red-600 hover:bg-red-800 text-white",
    tertiary: "bg-tertiary hover:bg-tertiary-dark text-white",
  };

  return (
    <button
      className={`flex items-center justify-center py-2 px-4 rounded-md cursor-pointer transition-colors duration-200 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
