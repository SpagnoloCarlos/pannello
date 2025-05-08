import { Navigate, useLocation, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoutes() {
  const { role } = useAuth();
  const location = useLocation();

  if (role !== "admin") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
