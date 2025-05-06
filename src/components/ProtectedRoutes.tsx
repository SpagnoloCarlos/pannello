import { Navigate, useLocation, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Dashboard/Sidebar";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <main className="flex gap-4 min-h-[100dvh] w-full">
      <Sidebar />
      <Outlet />
    </main>
  );
}
