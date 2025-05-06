import { useState } from "react";
import HamburgerIcon from "../Icons/HamburgerIcon";
import CloseIcon from "../Icons/CloseIcon";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useLocation } from "react-router";
import AngleRightIcon from "../Icons/AngleRightIcon";
import Button from "../Button";
import LogoutIcon from "../Icons/LogoutIcon";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard";

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        className="cursor-pointer flex items-center justify-center"
        onClick={() => handleOpen()}
      >
        <HamburgerIcon />
      </button>
      <div
        className={`absolute top-0 left-0 z-10 p-4 grid w-xs min-h-[100dvh] bg-gray-800 transition duration-500 ${open ? "-translate-x-0" : "-translate-x-80"}`}
      >
        <div className="flex flex-col gap-4">
          <button className="self-end cursor-pointer" onClick={() => handleClose()}>
            <CloseIcon />
          </button>
          <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-8">
                <h2 className="text-xl">Hola {user?.firstName}!</h2>
                {user?.role === "user" && (
                  <div className="flex flex-col gap-4">
                    {isDashboard ? (
                      <>
                        <NavLink
                          to="/dashboard/studies"
                          className="flex items-center justify-between py-2 px-4 bg-gray-950 rounded-md transition-color duration-200 hover:bg-black"
                        >
                          Ver estudios
                          <AngleRightIcon />
                        </NavLink>
                        <NavLink
                          className="flex items-center justify-between py-2 px-4 bg-gray-950 rounded-md transition-color duration-200 hover:bg-black"
                          to="/dashboard/addresses"
                        >
                          Ver direcciones
                          <AngleRightIcon />
                        </NavLink>
                      </>
                    ) : (
                      <NavLink
                        to="/dashboard"
                        className="flex items-center justify-between py-2 px-4 bg-gray-950 rounded-md transition-color duration-200 hover:bg-black"
                      >
                        Ver dashboard
                        <AngleRightIcon />
                      </NavLink>
                    )}
                  </div>
                )}
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
