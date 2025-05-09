import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { userSchemaProfile } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { updateUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { useToast } from "../../context/ToastContext";
import { setSessionValue } from "../../helpers/storageHelper";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

interface UserFormProps {
  onSuccess?: () => void;
}

const UserFormProfile = ({ onSuccess }: UserFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(userSchemaProfile),
    mode: "onSubmit",
  });
  const { token, user, setUser } = useAuth();
  const [error, setError] = useState<string>("");
  const { closeModal } = useModal();
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      const information = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      reset(information);
    }
  }, [user]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setError("");
    if (!token) {
      return;
    }

    const response = await updateUser(token, data);

    if (response.status === 0) {
      if (response.user) {
        setSessionValue("user", JSON.stringify(response.user));
        setUser(response.user);
      }
      onSuccess?.();
      closeModal();
      showToast({
        title: "Usuario modificado con éxito",
        position: "bottomRight",
      });
    } else {
      setError(response.msg);
      showToast({
        title: response.msg,
        position: "bottomRight",
      });
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-lg gap-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="firstName"
              label="Nombre"
              placeholder="Carlos"
              required
              error={errors?.firstName?.message ?? ""}
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              id="lastName"
              label="Apellido"
              placeholder="Spagnolo"
              required
              error={errors?.lastName?.message ?? ""}
              {...field}
            />
          )}
        />
      </div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="carlos@example.com"
            required
            error={errors?.email?.message ?? ""}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            type="password"
            id="password"
            label="Contraseña"
            placeholder="*********"
            error={errors?.password?.message ?? ""}
            {...field}
          />
        )}
      />
      <Button type="submit" className="mt-2 disabled:bg-gray-500">
        Editar Información
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </form>
  );
};

export default UserFormProfile;
