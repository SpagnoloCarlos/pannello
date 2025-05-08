import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import LogoutIcon from "./Icons/LogoutIcon";
import HomeIcon from "./Icons/HomeIcon";
import UserIcon from "./Icons/UserIcon";
import BookIcon from "./Icons/BookIcon";
import MapPinIcon from "./Icons/MapPinIcon";
import SidebarLink from "./SidebarLink";
import UsersIcon from "./Icons/UsersIcon";

const Sidebar = () => {
  const { logout } = useAuth();
  const { user } = useAuth();

  return (
    <aside className="w-full hidden md:block max-w-2xs px-6 py-8 bg-gray-800">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold uppercase mt-4">Pannello</h2>
          <div className="flex flex-col gap-4">
            <SidebarLink to="/dashboard">
              <HomeIcon />
              Dashboard
            </SidebarLink>
            <SidebarLink to="/profile">
              <UserIcon />
              Mi Perfil
            </SidebarLink>
            {user?.role === "user" && (
              <>
                <SidebarLink to="/studies">
                  <BookIcon />
                  Estudios
                </SidebarLink>
                <SidebarLink to="/addresses">
                  <MapPinIcon />
                  Direcciones
                </SidebarLink>
              </>
            )}
            {user?.role === "admin" && (
              <SidebarLink to="/users">
                <UsersIcon />
                Usuarios
              </SidebarLink>
            )}
          </div>
        </div>

        <Button variant="secondary" onClick={() => logout()}>
          <div className="flex items-center gap-2">
            Cerrar sesión
            <LogoutIcon />
          </div>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
