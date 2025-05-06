import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Dashboard/Sidebar";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <main className="flex gap-4 min-h-[100dvh] w-full">
      <Sidebar />
      {children}
    </main>
  );
}
