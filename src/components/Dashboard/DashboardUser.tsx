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
        <h1 className="text-3xl">Dashboard</h1>
      </header>
      <div className="flex flex-col md:grid md:grid-cols-4 md:grid-rows-2 gap-6 max-w-lg">
        <div className="md:col-span-4">
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
        </div>
        <div className="md:col-span-2 md:row-start-2">
          <Card>
            <div>
              <h2 className="text-xl font-semibold mb-4">Estudios</h2>
              {isPendingStudies ? (
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              ) : (
                <span className="text-lg text-white/80 h-7">{userStudies?.length}</span>
              )}
            </div>
          </Card>
        </div>
        <div className="md:col-span-2 md:row-start-2 md:col-start-3">
          <Card>
            <div>
              <h2 className="text-xl font-semibold mb-4">Direcciones</h2>
              <span className="text-lg text-white/80">
                {isPendingAddresses ? (
                  <div className="animate-pulse">
                    <div className="h-7 bg-gray-200 rounded w-full"></div>
                  </div>
                ) : (
                  <span className="text-lg text-white/80 h-7">{userAddresses?.length}</span>
                )}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
