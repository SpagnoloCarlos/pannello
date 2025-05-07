import { Navigate, useLocation, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function AdminRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
