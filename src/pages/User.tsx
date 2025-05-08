import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import HamburgerMenu from "../components/Dashboard/HamburgerMenu";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useAuth } from "../context/AuthContext";
import {
  deleteUser,
  fetchUserById,
  type Address,
  type Study,
  type UserWithoutPassword,
} from "../services/api";
import StudiesGrid from "../components/Studies/StudiesGrid";
import AddressesGrid from "../components/Addresses/AddressesGrid";
import TrashIcon from "../components/Icons/TrashIcon";
import EditIcon from "../components/Icons/EditIcon";
import { useModal } from "../context/ModalContext";
import UserForm from "../components/Users/UserForm";

interface User extends UserWithoutPassword {
  studies: Study[];
  addresses: Address[];
}

const User = () => {
  const { token } = useAuth();
  const params = useParams();
  const idUser = Number(params?.id || 0);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<User>();
  const { openModal, closeModal } = useModal();
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [isPendingDelete, startTransitionDelete] = useTransition();

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleEditUser = () => {
    openModal(
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold">Agregar estudio</h2>
        <div>
          <UserForm onSuccess={handleRefresh} idUser={idUser} />
        </div>
      </div>,
    );
  };

  const handleDeleteUser = () => {
    if (token) {
      startTransitionDelete(async () => {
        const response = await deleteUser(token, idUser);

        if (response?.status === 0) {
          closeModal();
          navigate("/users");
        } else {
          console.log(response?.msg);
        }
      });
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleDeleteUserConfirm = () => {
    openModal(
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold">¿Está seguro de eliminar este usuario?</h2>
        <div className="flex items-center justify-end gap-4">
          <Button variant="primary" onClick={handleCancel} disabled={isPendingDelete}>
            Cancelar
          </Button>
          <Button variant="secondary" onClick={handleDeleteUser} disabled={isPendingDelete}>
            Eliminar
          </Button>
        </div>
      </div>,
    );
  };

  useEffect(() => {
    if (token && idUser) {
      startTransition(async () => {
        const response = await fetchUserById(token, idUser);

        if (response?.status === 0 && response?.user) {
          setUser(response?.user);
        } else {
          console.log(response?.msg);
        }
      });
    }
  }, [token, idUser, refreshKey]);

  if (!isPending && !user) {
    return (
      <section className="w-full max-w-5xl px-6 py-8">
        <h1>Usuario no encontrado</h1>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col lg:flex-row lg:items-center gap-4 border-b-1 border-gray-400 pb-8">
          <div className="flex gap-4">
            <HamburgerMenu />
            <div className="flex flex-col gap-1">
              {isPending ? (
                <div className="animate-pulse">
                  <div className="h-7 md:h-9 bg-gray-200 rounded w-64 md:w-96 mb-3 md:mb-4"></div>
                  <div className="h-5 md:h-5 bg-gray-200 rounded w-full 2xs:w-70 md:w-76"></div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl md:text-4xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p>
                    <span className="text-sm font-semibold border border-gray-400 rounded-4xl py-1 px-3 mt-2 max-w-fit">
                      {user?.role === "admin" ? "Administrador" : "Usuario"}
                    </span>
                    <span className="hidden text-lg md:inline-block md:mx-2">-</span>
                    <span className="inline-block mx-1 text-lg md:hidden"></span>
                    <span className="text-sm md:text-lg text-white/80">{user?.email}</span>
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row lg:ml-auto">
            <Button variant="tertiary" className="gap-2" onClick={handleEditUser}>
              Editar Usuario
              <EditIcon />
            </Button>
            <Button variant="secondary" className="gap-2" onClick={handleDeleteUserConfirm}>
              Eliminar Usuario
              <TrashIcon />
            </Button>
          </div>
        </header>

        <div className="flex flex-col gap-8 my-4">
          <h2 className="text-3xl font-semibold">Estudios</h2>
          <StudiesGrid studies={user?.studies ?? null} />
        </div>

        <div className="flex flex-col gap-8 my-4">
          <h2 className="text-3xl font-semibold">Direcciones</h2>
          <AddressesGrid addresses={user?.addresses ?? null} />
        </div>
      </div>
    </section>
  );
};

export default User;
