interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <div className="p-4 rounded-md border border-gray-400">{children}</div>;
};

export default Card;
