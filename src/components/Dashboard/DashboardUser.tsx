import { useAuth } from "../../context/AuthContext";
import Card from "./Card";
import HamburgerMenu from "./HamburgerMenu";
import { useEffect, useState, useTransition } from "react";
import { fetchUserAddresses, fetchUserStudies, type Address, type Study } from "../../services/api";

const DashboardUser = () => {
  const { user, token } = useAuth();
  const [isPendingStudies, startTransitionStudies] = useTransition();
  const [isPendingAddresses, startTransitionAddresses] = useTransition();
  const [userStudies, setUserStudies] = useState<Study[]>();
  const [userAddresses, setUserAddresses] = useState<Address[]>();

  useEffect(() => {
    startTransitionStudies(async () => {
      if (!token) return;

      const response = await fetchUserStudies(token);
      setUserStudies(response);
    });

    startTransitionAddresses(async () => {
      if (!token) return;

      const response = await fetchUserAddresses(token);
      setUserAddresses(response);
    });
  }, [token]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <HamburgerMenu />
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <span className="text-md text-white/80">
            Bienvenido, {user?.firstName} {user?.lastName}
          </span>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
        {/* <div className="md:col-span-4">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Información personal</h2>
            <ul className="text-white/80">
              <li>
                Nombre: <span>{user?.firstName}</span>
              </li>
              <li>
                Apellido: <span>{user?.lastName}</span>
              </li>
              <li>
                Email: <span>{user?.email}</span>
              </li>
              <li>
                Rol: <span>{user?.role === "admin" ? "Administrador" : "Usuario"}</span>
              </li>
            </ul>
          </Card>
        </div> */}
        <Card>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Estudios</h2>
            <span className="text-sm text-white/60 mb-3">Tus registros académicos</span>
            {isPendingStudies ? (
              <div className="animate-pulse">
                <div className="h-9 bg-gray-200 rounded w-9"></div>
              </div>
            ) : (
              <span className="text-3xl font-bold">{userStudies?.length}</span>
            )}
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Direcciones</h2>
            <span className="text-sm text-white/60 mb-3">Tus direcciones registradas</span>
            {isPendingAddresses ? (
              <div className="animate-pulse">
                <div className="h-9 bg-gray-200 rounded w-9"></div>
              </div>
            ) : (
              <span className="text-3xl font-bold">{userAddresses?.length}</span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardUser;
