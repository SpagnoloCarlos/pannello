import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteAddress, fetchUserAddresses, type Address } from "../../services/api";
import Card from "../Card";
import { useModal } from "../../context/ModalContext";
import AddressForm from "./AddressForm";
import Button from "../Button";
import EditIcon from "../Icons/EditIcon";
import TrashIcon from "../Icons/TrashIcon";
import ConfirmDialog from "../ConfirmDialog";
import { useToast } from "../../context/ToastContext";

interface AddressesGridProps {
  onRefresh?: () => void;
  addresses?: Address[] | null;
}

const AddressesGrid = ({ onRefresh, addresses }: AddressesGridProps) => {
  const { token, user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [userAddresses, setUserAddresses] = useState<Address[]>();
  const skeletonArray = Array(3).fill(null);
  const { openModal, closeModal } = useModal();
  const { showToast } = useToast();

  useEffect(() => {
    if (token) {
      if (addresses === undefined) {
        startTransition(async () => {
          const response = await fetchUserAddresses(token);
          if (response.status === 0) {
            setUserAddresses(response.addresses);
          } else {
            showToast({
              title: response.msg,
              position: "bottomRight",
            });
          }
        });
      } else {
        if (addresses) {
          setUserAddresses(addresses);
        }
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

  const handleDeleteAddress = async (id: number) => {
    if (token) {
      const response = await deleteAddress(token, id);

      if (response?.status === 0) {
        closeModal();
        showToast({
          title: "Dirección eliminada con éxito",
          position: "bottomRight",
        });
        if (onRefresh) {
          onRefresh();
        }
      } else {
        showToast({
          title: response.msg,
          position: "bottomRight",
        });
      }
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleDeleteAddressConfirm = (id: number) => {
    openModal(
      <ConfirmDialog
        title="¿Está seguro de eliminar esta dirección?"
        onConfirm={() => handleDeleteAddress(id)}
        onCancel={handleCancel}
      />,
    );
  };

  if (addresses && addresses?.length === 0) {
    return <p>El usuario no tiene direcciones cargadas</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isPending || addresses === null
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
                  <div className="flex items-center gap-2 mt-4">
                    <Button className="gap-1 w-1/2" onClick={() => handleEditAddress(id)}>
                      Editar
                      <EditIcon />
                    </Button>
                    <Button
                      variant="secondary"
                      className="gap-1 w-1/2"
                      onClick={() => handleDeleteAddressConfirm(id)}
                    >
                      Eliminar
                      <TrashIcon />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
    </div>
  );
};

export default AddressesGrid;
