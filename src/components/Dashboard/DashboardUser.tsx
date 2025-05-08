import { useAuth } from "../../context/AuthContext";
import Card from "../Card";
import HamburgerMenu from "../HamburgerMenu";
import { useEffect, useState, useTransition } from "react";
import { fetchUserAddresses, fetchUserStudies, type Address, type Study } from "../../services/api";

const DashboardUser = () => {
  const { user, token } = useAuth();
  const [isPendingStudies, startTransitionStudies] = useTransition();
  const [isPendingAddresses, startTransitionAddresses] = useTransition();
  const [userStudies, setUserStudies] = useState<Study[]>();
  const [userAddresses, setUserAddresses] = useState<Address[]>();

  useEffect(() => {
    if (token) {
      startTransitionStudies(async () => {
        const response = await fetchUserStudies(token);
        if (response.status === 0) {
          setUserStudies(response.studies);
        } else {
          console.log(response.msg);
        }
      });

      startTransitionAddresses(async () => {
        const response = await fetchUserAddresses(token);
        if (response.status === 0) {
          setUserAddresses(response.addresses);
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
            Bienvenido, {user?.firstName} {user?.lastName}.
          </span>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
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
