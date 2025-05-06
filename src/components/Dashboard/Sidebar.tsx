import { useAuth } from "../../context/AuthContext";
import Button from "../Button";
import { NavLink, useLocation } from "react-router";
import AngleRightIcon from "../Icons/AngleRightIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import AngleLeftIcon from "../Icons/AngleLeftIcon";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard";

  return (
    <aside className="w-full hidden md:block max-w-xs px-6 py-8 bg-gray-800">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-8">
          <h2 className="text-xl mt-4">Hola {user?.firstName}!</h2>
          {user?.role === "user" && (
            <div className="flex flex-col gap-4">
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
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {!isDashboard && (
            <NavLink
              to="/dashboard"
              className="flex items-center justify-between py-2 px-4 bg-gray-950 rounded-md transition-color duration-200 hover:bg-black"
            >
              <AngleLeftIcon />
              Volver al dashboard
            </NavLink>
          )}
          <Button variant="secondary" onClick={() => logout()}>
            <div className="flex items-center gap-2">
              Cerrar sesión
              <LogoutIcon />
            </div>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
