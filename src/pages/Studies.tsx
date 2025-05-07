import Button from "../components/Button";
import HamburgerMenu from "../components/Dashboard/HamburgerMenu";
import StudiesGrid from "../components/Studies/StudiesGrid";
import CirclePlusIcon from "../components/Icons/CirclePlusIcon";
import { useModal } from "../context/ModalContext";

const Studies = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Agregar estudio</h2>
      </div>,
    );
  };

  return (
    <section className="w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex items-center gap-4">
          <HamburgerMenu />
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold">Mis Estudios</h1>
            <span className="text-md text-white/80">Gestiona tu información académica</span>
          </div>
          <Button variant="tertiary" className="ml-auto gap-2" onClick={handleOpenModal}>
            Agregar Estudio
            <CirclePlusIcon />
          </Button>
        </header>
        <StudiesGrid />
      </div>
    </section>
  );
};

export default Studies;
