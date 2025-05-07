import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUserAddresses, type Address } from "../../services/api";
import Card from "../Card";

const AddressesGrid = () => {
  const { token } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [userAddresses, setUserAddresses] = useState<Address[]>();
  const skeletonArray = Array(3).fill(null);

  useEffect(() => {
    startTransition(async () => {
      if (!token) return;

      const response = await fetchUserAddresses(token);
      setUserAddresses(response);
    });
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isPending
        ? skeletonArray.map((_, index) => (
            <Card key={`skeleton_address_${index}`}>
              <div className="animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-full mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-46 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-36 mb-1"></div>
              </div>
            </Card>
          ))
        : userAddresses?.map(({ id, street, city, zipCode, country }) => (
            <Card key={`address_card_${id}`}>
              <div className="flex flex-col">
                <span className="text-2xl font-bold mb-4">{street}</span>
                <span className="text-md text-white/60">Ciudad: {city}</span>
                <span className="text-md text-white/60">País: {country}</span>
                <span className="text-md text-white/60">Código Posta: {zipCode}</span>
              </div>
            </Card>
          ))}
    </div>
  );
};

export default AddressesGrid;
