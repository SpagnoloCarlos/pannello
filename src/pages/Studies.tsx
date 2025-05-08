import { useState, useCallback, useEffect } from "react";
import Button from "../components/Button";
import HamburgerMenu from "../components/HamburgerMenu";
import StudiesGrid from "../components/Studies/StudiesGrid";
import CirclePlusIcon from "../components/Icons/CirclePlusIcon";
import { useModal } from "../context/ModalContext";
import StudyForm from "../components/Studies/StudyForm";

const Studies = () => {
  const { openModal } = useModal();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    document.title = "Mis Estudios | Pannello";
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleAddStudy = () => {
    openModal(
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold">Agregar estudio</h2>
        <div>
          <StudyForm onSuccess={handleRefresh} />
        </div>
      </div>,
    );
  };

  return (
    <section className="w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex gap-4">
            <HamburgerMenu />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl md:text-4xl font-bold">Mis Estudios</h1>
              <span className="text-sm md:text-md text-white/80">
                Gestiona tu información académica
              </span>
            </div>
          </div>
          <Button variant="tertiary" className="md:ml-auto gap-2" onClick={handleAddStudy}>
            Agregar Estudio
            <CirclePlusIcon />
          </Button>
        </header>
        <StudiesGrid key={refreshKey} onRefresh={handleRefresh} />
      </div>
    </section>
  );
};

export default Studies;
