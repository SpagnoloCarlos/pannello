import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { AddressSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { createAddress, fetchUserAddressById, updateAddress } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useToast } from "../../context/ToastContext";

interface IAddressFormInput {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

interface AddressFormProps {
  onSuccess?: () => void;
  idAddress?: number;
}

const AddressForm = ({ onSuccess, idAddress }: AddressFormProps) => {
  const [defaultValues, setDefaultValues] = useState({
    street: "",
    city: "",
    country: "",
    zipCode: "",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(AddressSchema),
  });
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { closeModal } = useModal();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  useEffect(() => {
    if (idAddress && token) {
      startTransition(async () => {
        const response = await fetchUserAddressById(token, idAddress);
        if (response.status === 0 && response.address) {
          setDefaultValues(response.address);
          reset(response.address);
        } else {
          showToast({
            title: response.msg,
            position: "bottomRight",
          });
        }
      });
    }
  }, [idAddress, token, reset]);

  const onSubmit: SubmitHandler<IAddressFormInput> = async (data) => {
    setLoading(true);
    setError("");
    if (!token) {
      return;
    }
    const response = idAddress
      ? await updateAddress(token, idAddress, data)
      : await createAddress(token, data);

    if (response.status === 0) {
      closeModal();
      onSuccess?.();
      showToast({
        title: idAddress ? "Dirección modificada con éxito" : "Dirección creada con éxito",
        position: "bottomRight",
      });
    } else {
      showToast({
        title: response.msg,
        position: "bottomRight",
      });
      setError(response.msg);
    }

    setLoading(false);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-lg gap-4"
    >
      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            id="street"
            label="Calle"
            placeholder="Av. Gral Roca 1950"
            required
            error={errors?.street?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            id="city"
            label="Ciudad"
            placeholder="San Miguel de Tucumán"
            required
            error={errors?.city?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            id="country"
            label="País"
            placeholder="Argentina"
            required
            error={errors?.country?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Controller
        name="zipCode"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            id="zipCode"
            label="Codigo Posta"
            placeholder="4000"
            required
            error={errors?.zipCode?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Button type="submit" className="mt-2 disabled:bg-gray-500" disabled={loading || isPending}>
        {idAddress ? "Editar Dirección" : "Agregar Dirección"}
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </form>
  );
};

export default AddressForm;
