interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`p-6 rounded-md border border-gray-400 ${className}`}>{children}</div>;
};

export default Card;
