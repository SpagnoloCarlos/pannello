import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchUserAddresses, type Address } from "../../services/api";

const AddressTable = () => {
  const { token } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [userAddresses, setUserAddresses] = useState<Address[]>();
  const skeletonArray = Array(4).fill(null);

  useEffect(() => {
    startTransition(async () => {
      if (!token) return;

      const response = await fetchUserAddresses(token);
      setUserAddresses(response);
    });
  }, [token]);

  return (
    <table className="border border-gray-400 rounded-md">
      <thead className="border-b-1 border-gray-400">
        <tr className="[&>th]:py-2 [&>th]:px-3 [&>th]:font-bold [&>th]:text-left">
          <th>Calle</th>
          <th>Ciudad</th>
          <th>Código postal</th>
          <th>País</th>
          <th>Actualizar</th>
        </tr>
      </thead>
      {isPending ? (
        <tbody className="[&>tr>td]:py-2 [&>tr>td]:px-3">
          {skeletonArray.map((_, index) => (
            <tr key={`skeleton_address_row_${index}`}>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
              <td>
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody className="[&>tr:nth-child(odd)]:bg-gray-700">
          {userAddresses?.map(({ id, street, city, zipCode, country }) => (
            <tr key={`address_row_${id}`} className="[&>td]:py-2 [&>td]:px-3 [&>td]:text-white/70">
              <td>{street}</td>
              <td>{city}</td>
              <td>{zipCode}</td>
              <td>{country}</td>
              <td>Editar</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default AddressTable;
