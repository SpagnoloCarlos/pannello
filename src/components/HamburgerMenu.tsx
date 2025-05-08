import { useState } from "react";
import HamburgerIcon from "./Icons/HamburgerIcon";
import CloseIcon from "./Icons/CloseIcon";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import LogoutIcon from "./Icons/LogoutIcon";
import SidebarLink from "./SidebarLink";
import HomeIcon from "./Icons/HomeIcon";
import UserIcon from "./Icons/UserIcon";
import BookIcon from "./Icons/BookIcon";
import MapPinIcon from "./Icons/MapPinIcon";
import UsersIcon from "./Icons/UsersIcon";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div className="md:hidden mt-1">
      <button
        className="cursor-pointer flex items-center justify-center"
        onClick={() => handleOpen()}
      >
        <HamburgerIcon />
      </button>
      <div
        className={`fixed inset-0 backdrop-blur-sm transition duration-200 ${open ? "z-auto bg-black/50" : "-z-10 bg-transparent"}`}
        onClick={() => handleClose()}
        aria-hidden="true"
      />
      <div
        className={`absolute top-0 left-0 z-10 p-4 grid w-2xs min-h-[100dvh] bg-gray-800 transition duration-500 ${open ? "-translate-x-0" : "-translate-x-80"}`}
      >
        <div className="flex flex-col gap-4">
          <button
            className="self-end p-1 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
            onClick={() => handleClose()}
          >
            <CloseIcon />
          </button>
          <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-8">
                <h2 className="text-2xl font-bold uppercase">Pannello</h2>
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

              <Button className="mt-auto" variant="secondary" onClick={() => logout()}>
                <div className="flex items-center gap-2">
                  Cerrar sesión
                  <LogoutIcon />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
