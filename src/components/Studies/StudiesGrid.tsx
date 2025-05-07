import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUserStudies, type Study } from "../../services/api";
import Card from "../Card";

interface StudiesGridProps {
  onRefresh?: () => void;
}

const StudiesGrid = ({ onRefresh }: StudiesGridProps) => {
  const { token } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [userStudies, setUserStudies] = useState<Study[]>();
  const skeletonArray = Array(3).fill(null);

  useEffect(() => {
    startTransition(async () => {
      if (!token) return;

      const response = await fetchUserStudies(token);
      setUserStudies(response);
    });
  }, [token]);

  useEffect(() => {
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isPending
        ? skeletonArray.map((_, index) => (
            <Card key={`skeleton_study_${index}`}>
              <div className="animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-full mb-6"></div>
                <div className="h-5 bg-gray-200 rounded w-46 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </Card>
          ))
        : userStudies?.map(({ id, title, institution, year, description }) => (
            <Card key={`study_card_${id}`}>
              <div className="flex flex-col">
                <span className="text-2xl font-bold mb-4">{title}</span>
                <span className="text-md font-semibold">{institution}</span>
                <span className="text-sm text-white/60">Año: {year}</span>
                <p className="text-sm text-white/60">{description}</p>
              </div>
            </Card>
          ))}
    </div>
  );
};

export default StudiesGrid;
