import Button from "../components/Button";
import Card from "../components/Card";
import HamburgerMenu from "../components/HamburgerMenu";
import EditIcon from "../components/Icons/EditIcon";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useModal } from "../context/ModalContext";
import UserFormProfile from "../components/Users/UserFormProfile";

const Profile = () => {
  const { user, role } = useAuth();
  const { openModal } = useModal();

  useEffect(() => {
    document.title = "Mi Perfil | Pannello";
  }, []);

  const handleEditProfile = () => {
    openModal(
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold">Editar información</h2>
        <div>
          <UserFormProfile />
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
              <h1 className="text-2xl md:text-4xl font-bold">Mi Perfil</h1>
              <span className="text-sm md:text-md text-white/80">Administra tu información</span>
            </div>
          </div>
          <Button variant="tertiary" className="md:ml-auto gap-2" onClick={handleEditProfile}>
            Editar Información
            <EditIcon />
          </Button>
        </header>
        <Card className="max-w-sm">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Información personal</h2>
          <ul className="flex flex-col gap-4 [&>li]:flex [&>li]:flex-col">
            <li>
              <span className="text-sm text-white/60">Nombre</span>
              <span className="text-lg">
                {user?.firstName} {user?.lastName}
              </span>
            </li>
            <li>
              <span className="text-sm text-white/60">Email</span>
              <span className="text-lg">{user?.email}</span>
            </li>
            <li>
              <span className="text-sm text-white/60">Rol</span>
              <span className="text-lg">{role === "admin" ? "Administrador" : "Usuario"}</span>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default Profile;
