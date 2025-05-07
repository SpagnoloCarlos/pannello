import Button from "../components/Button";
import AddressesGrid from "../components/Dashboard/Addresses.grid";
import HamburgerMenu from "../components/Dashboard/HamburgerMenu";
import CirclePlusIcon from "../components/Icons/CirclePlusIcon";
import { useModal } from "../context/ModalContext";

const Addresses = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Agregar dirección</h2>
      </div>,
    );
  };
  return (
    <section className="w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex items-center gap-4">
          <HamburgerMenu />
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold">Direcciones</h1>
            <span className="text-md text-white/80">Gestiona tus direcciones registradas</span>
          </div>
          <Button variant="tertiary" className="ml-auto gap-2" onClick={handleOpenModal}>
            Agregar Dirección
            <CirclePlusIcon />
          </Button>
        </header>
        <AddressesGrid />
      </div>
    </section>
  );
};

export default Addresses;
