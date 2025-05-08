import { useAuth } from "../context/AuthContext";
import DashboardAdmin from "../components/Dashboard/DashboardAdmin";
import DashboardUser from "../components/Dashboard/DashboardUser";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Dashboard | Pannello";
  }, []);

  return (
    <section className="w-full max-w-5xl px-6 py-8">
      {user?.role === "admin" ? <DashboardAdmin /> : <DashboardUser />}
    </section>
  );
};

export default Dashboard;
