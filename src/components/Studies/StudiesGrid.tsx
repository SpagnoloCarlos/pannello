import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteStudy, deleteStudyByAdmin, fetchUserStudies, type Study } from "../../services/api";
import Card from "../Card";
import Button from "../Button";
import { useModal } from "../../context/ModalContext";
import StudyForm from "./StudyForm";
import EditIcon from "../Icons/EditIcon";
import TrashIcon from "../Icons/TrashIcon";
import ConfirmDialog from "../ConfirmDialog";
import { useToast } from "../../context/ToastContext";
import { useParams } from "react-router";

interface StudiesGridProps {
  onRefresh?: () => void;
  studies?: Study[] | null;
}

const StudiesGrid = ({ onRefresh, studies }: StudiesGridProps) => {
  const { token, role } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [userStudies, setUserStudies] = useState<Study[]>();
  const skeletonArray = Array(3).fill(null);
  const { openModal, closeModal } = useModal();
  const { showToast } = useToast();
  const params = useParams();
  const idUser = Number(params?.id || 0);

  useEffect(() => {
    if (token) {
      if (studies === undefined) {
        startTransition(async () => {
          const response = await fetchUserStudies(token);
          if (response.status === 0) {
            setUserStudies(response.studies);
          } else {
            showToast({
              title: response.msg,
              position: "bottomRight",
            });
          }
        });
      } else {
        if (studies) {
          setUserStudies(studies);
        }
      }
    }
  }, [token, studies]);

  const handleEditStudy = (id: number): void => {
    openModal(
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold">Editar estudio</h2>
        <div>
          <StudyForm onSuccess={onRefresh} idStudy={id} idUser={idUser} />
        </div>
      </div>,
    );
  };

  const handleDeleteStudy = async (id: number) => {
    if (token) {
      const response =
        role === "admin"
          ? await deleteStudyByAdmin(token, idUser, id)
          : await deleteStudy(token, id);

      if (response?.status === 0) {
        showToast({
          title: "Estudio eliminado con éxito",
          position: "bottomRight",
        });
        if (onRefresh) {
          onRefresh();
        }
      } else {
        showToast({
          title: response.msg,
          position: "bottomRight",
        });
      }
      closeModal();
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleDeleteStudyConfirm = (id: number) => {
    openModal(
      <ConfirmDialog
        title="¿Está seguro de eliminar este estudio?"
        onConfirm={() => handleDeleteStudy(id)}
        onCancel={handleCancel}
      />,
    );
  };

  if (studies && studies?.length === 0) {
    return <p>El usuario no tiene estudios cargados</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {isPending || studies === null
        ? skeletonArray.map((_, index) => (
            <Card key={`skeleton_study_${index}`}>
              <div className="animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-full mb-6"></div>
                <div className="h-5 bg-gray-200 rounded w-46 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-md w-full"></div>
              </div>
            </Card>
          ))
        : userStudies?.map(({ id, title, institution, year, description }) => (
            <Card key={`study_card_${id}`}>
              <div className="flex flex-col h-full">
                <span className="text-2xl font-bold mb-4">{title}</span>
                <span className="text-md font-semibold">{institution}</span>
                <span className="text-sm text-white/60">Año: {year}</span>
                <p className="text-sm text-white/60 mb-auto">{description}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Button className="w-1/2 gap-1" onClick={() => handleEditStudy(id)}>
                    Editar
                    <EditIcon />
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-1/2 gap-1"
                    onClick={() => handleDeleteStudyConfirm(id)}
                  >
                    Eliminar
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
    </div>
  );
};

export default StudiesGrid;
