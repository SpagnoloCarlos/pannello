import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUserStudies, type Study } from "../../services/api";

const StudyTable = () => {
  const { token } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [userStudies, setUserStudies] = useState<Study[]>();
  const skeletonArray = Array(4).fill(null);

  useEffect(() => {
    startTransition(async () => {
      if (!token) return;

      const response = await fetchUserStudies(token);
      setUserStudies(response);
    });
  }, [token]);

  return (
    <table className="border border-gray-400 rounded-md">
      <thead className="border-b-1 border-gray-400">
        <tr className="[&>th]:py-2 [&>th]:px-3 [&>th]:font-bold [&>th]:text-left">
          <th>Título</th>
          <th>Institución</th>
          <th>Año</th>
          <th>Descripción</th>
          <th>Actualizar</th>
        </tr>
      </thead>
      {isPending ? (
        <tbody className="[&>tr>td]:py-2 [&>tr>td]:px-3">
          {skeletonArray.map((_, index) => (
            <tr key={`skeleton_row_${index}`}>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody className="[&>tr:nth-child(odd)]:bg-gray-700">
          {userStudies?.map(({ id, title, institution, year, description }) => (
            <tr key={`study_row_${id}`} className="[&>td]:py-2 [&>td]:px-3 [&>td]:text-white/70">
              <td>{title}</td>
              <td>{institution}</td>
              <td>{year}</td>
              <td>{description}</td>
              <td>Editar</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default StudyTable;
