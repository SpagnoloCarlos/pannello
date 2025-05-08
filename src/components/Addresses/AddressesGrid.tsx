import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUserAddresses, type Address } from "../../services/api";
import Card from "../Card";
import { useModal } from "../../context/ModalContext";
import AddressForm from "./AddressForm";
import Button from "../Button";

interface AddressesGridProps {
  onRefresh?: () => void;
  addresses?: Address[];
}

const AddressesGrid = ({ onRefresh, addresses }: AddressesGridProps) => {
  const { token, user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [userAddresses, setUserAddresses] = useState<Address[]>();
  const skeletonArray = Array(3).fill(null);
  const { openModal } = useModal();

  useEffect(() => {
    if (token) {
      if (!addresses) {
        startTransition(async () => {
          const response = await fetchUserAddresses(token);
          setUserAddresses(response);
        });
      } else {
        setUserAddresses(addresses);
      }
    }
  }, [token, addresses]);

  const handleEditAddress = (id: number) => {
    openModal(
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Editar dirección</h2>
        <div>
          <AddressForm onSuccess={onRefresh} idAddress={id} />
        </div>
      </div>,
    );
  };

  if (addresses && addresses?.length === 0) {
    return <p>El usuario no tiene direcciones cargados</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isPending
        ? skeletonArray.map((_, index) => (
            <Card key={`skeleton_address_${index}`}>
              <div className="animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-full mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-46 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                {user?.role === "user" ? (
                  <>
                    <div className="h-4 bg-gray-200 rounded w-36 mb-5"></div>
                    <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                  </>
                ) : (
                  <div className="h-4 bg-gray-200 rounded w-36 mb-1"></div>
                )}
              </div>
            </Card>
          ))
        : userAddresses?.map(({ id, street, city, zipCode, country }) => (
            <Card key={`address_card_${id}`}>
              <div className="flex flex-col h-full">
                <span className="text-2xl font-bold mb-4">{street}</span>
                <span className="text-md text-white/60">Ciudad: {city}</span>
                <span className="text-md text-white/60">País: {country}</span>
                <span className="text-md text-white/60 mb-auto">Código Postal: {zipCode}</span>
                {user?.role === "user" && (
                  <Button className="mt-4" onClick={() => handleEditAddress(id)}>
                    Editar
                  </Button>
                )}
              </div>
            </Card>
          ))}
    </div>
  );
};

export default AddressesGrid;
