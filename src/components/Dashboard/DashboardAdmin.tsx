import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../../context/AuthContext";
import HamburgerMenu from "./HamburgerMenu";
import { fetchUsers, type UserWithoutPassword } from "../../services/api";
import Card from "../Card";

const DashboardAdmin = () => {
  const { user, token } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [users, setUsers] = useState<UserWithoutPassword[]>();

  useEffect(() => {
    if (token) {
      startTransition(async () => {
        const response = await fetchUsers(token);
        if (response.status === 0) {
          setUsers(response.users);
        } else {
          console.log(response.msg);
        }
      });
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex gap-4">
        <HamburgerMenu />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-4xl font-bold">Dashboard</h1>
          <span className="text-sm md:text-md text-white/80">
            Bienvenido, {user?.firstName} {user?.lastName}. Tienes acceso de administrador.
          </span>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
        <Card>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
            <span className="text-sm text-white/60 mb-3">Total de usuarios en el sistema</span>
            {isPending ? (
              <div className="animate-pulse">
                <div className="h-9 bg-gray-200 rounded w-9"></div>
              </div>
            ) : (
              <span className="text-3xl font-bold">{users?.length}</span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAdmin;
