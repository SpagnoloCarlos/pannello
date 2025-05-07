import Card from "../components/Card";
import HamburgerMenu from "../components/Dashboard/HamburgerMenu";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <section className="w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex items-center gap-4">
          <HamburgerMenu />
          <h1 className="text-4xl font-bold">Mi Perfl</h1>
        </header>
        <Card className="max-w-sm">
          <h2 className="text-3xl font-semibold mb-4">Información personal</h2>
          <ul className="flex flex-col gap-4 [&>li]:flex [&>li]:flex-col">
            <li>
              <span className="text-sm text-white/60">Nombre</span>
              <span className="text-lg">
                {user?.firstName} {user?.lastName}
              </span>
            </li>
            <li>
              <span className="text-sm text-white/60">Email</span>
              <span className="text-lg">{user?.email}</span>
            </li>
            <li>
              <span className="text-sm text-white/60">Rol</span>
              <span className="text-lg">
                {user?.role === "admin" ? "Administrador" : "Usuario"}
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default Profile;
