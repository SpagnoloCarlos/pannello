import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { userSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { createUser, fetchUserById, updateUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import Select from "../Select";
import { useToast } from "../../context/ToastContext";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface UserFormProps {
  onSuccess?: () => void;
  idUser?: number;
}

const UserForm = ({ onSuccess, idUser }: UserFormProps) => {
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
      role: "user",
    },
    resolver: zodResolver(userSchema),
  });
  const { token } = useAuth();
  const [error, setError] = useState<string>("");
  const { closeModal } = useModal();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  useEffect(() => {
    if (token && idUser) {
      startTransition(async () => {
        const response = await fetchUserById(token, idUser);
        if (response.status === 0 && response.user !== undefined) {
          reset(response.user);
        } else {
          showToast({
            title: response.msg,
            position: "bottomRight",
          });
        }
      });
    }
  }, [idUser, token, reset]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setError("");
    if (!token) {
      return;
    }

    const response = idUser ? await updateUser(token, idUser, data) : await createUser(token, data);

    if (response.status === 0) {
      onSuccess?.();
      closeModal();
      showToast({
        title: idUser ? "Usuario modificado con éxito" : "Usuario creado con éxito",
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
              disabled={isPending}
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
              disabled={isPending}
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
            disabled={isPending}
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
            placeholder="***********"
            required
            error={errors?.password?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            id="role"
            label="Rol"
            error={errors?.role?.message ?? ""}
            disabled={isPending}
            options={[
              { label: "Usuario", value: "user" },
              { label: "Administrador", value: "admin" },
            ]}
            {...field}
          />
        )}
      />
      <Button type="submit" className="mt-2 disabled:bg-gray-500" disabled={isPending}>
        {idUser ? "Editar Usuario" : "Crear Usuario"}
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </form>
  );
};

export default UserForm;
