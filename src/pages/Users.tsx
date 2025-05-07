import { useCallback, useState } from "react";
import Button from "../components/Button";
import HamburgerMenu from "../components/Dashboard/HamburgerMenu";
import { useModal } from "../context/ModalContext";
import UserPlusIcon from "../components/Icons/UserPlusIcon";
import UsersGrid from "../components/Users/UsersGrid";
import UserForm from "../components/Users/UserForm";

const Users = () => {
  const { openModal } = useModal();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleAddUser = () => {
    openModal(
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold">Crear usuario</h2>
        <div>
          <UserForm onSuccess={handleRefresh} />
        </div>
      </div>,
    );
  };

  return (
    <section className="w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex gap-4">
            <HamburgerMenu />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl md:text-4xl font-bold">Gestión de Usuarios</h1>
              <span className="text-sm md:text-md text-white/80">
                Administra los usuarios del sistema
              </span>
            </div>
          </div>
          <Button variant="tertiary" className="md:ml-auto gap-2" onClick={handleAddUser}>
            Crear Usuario
            <UserPlusIcon />
          </Button>
        </header>
        <UsersGrid key={refreshKey} />
      </div>
    </section>
  );
};

export default Users;
