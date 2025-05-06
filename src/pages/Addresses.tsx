import AddressTable from "../components/Dashboard/AddressTable";
import HamburgerMenu from "../components/Dashboard/HamburgerMenu";

const Addresses = () => {
  return (
    <section className="w-full max-w-5xl px-6 py-8">
      <div className="flex flex-col gap-8">
        <header className="flex items-center gap-4">
          <HamburgerMenu />
          <h1 className="text-3xl">Direcciones</h1>
        </header>
        <AddressTable />
      </div>
    </section>
  );
};

export default Addresses;
