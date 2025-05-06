import { useAuth } from "../context/AuthContext";
import HamburgerMenu from "../components/Dashboard/HamburgerMenu";

const Studies = () => {
  const { user } = useAuth();

  return (
    <section className="w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex items-center gap-4">
          <HamburgerMenu />
          <h1 className="text-3xl">Estudios</h1>
        </header>
      </div>
    </section>
  );
};

export default Studies;
