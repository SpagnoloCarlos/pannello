import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { AddressSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createAddress, createStudy } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";

interface IAddressFormInput {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

interface AddressFormProps {
  onSuccess?: () => void;
}

const AddressForm = ({ onSuccess }: AddressFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: "",
      city: "",
      country: "",
      zipCode: "",
    },
    resolver: zodResolver(AddressSchema),
  });
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<IAddressFormInput> = async (data) => {
    setLoading(true);
    setError("");
    if (!token) {
      return;
    }
    const response = await createAddress(token, data);

    if (response.status === 0) {
      onSuccess?.();
      closeModal();
    } else {
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
            {...field}
          />
        )}
      />
      <Button type="submit" className="mt-2 disabled:bg-gray-500" disabled={loading}>
        Agregar Dirección
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </form>
  );
};

export default AddressForm;
