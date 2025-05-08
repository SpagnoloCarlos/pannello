import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { userSchema } from "../../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { createUser, fetchUserById, updateUser, type User } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import Select from "../Select";

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
  const [defaultValues, setDefaultValues] = useState<IFormInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(userSchema),
  });
  const { token } = useAuth();
  const [error, setError] = useState<string>("");
  const { closeModal } = useModal();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setError("");
    if (!token) {
      return;
    }

    const response = idUser ? await updateUser(token, idUser, data) : await createUser(token, data);

    if (response.status === 0) {
      onSuccess?.();
      closeModal();
    } else {
      setError(response.msg);
    }
  };

  useEffect(() => {
    if (token && idUser) {
      startTransition(async () => {
        const response = await fetchUserById(token, idUser);
        if (response.status === 0 && response.user !== undefined) {
          const user: User = {
            ...response.user,
            password: "",
          };
          setDefaultValues(user);
          reset(response.user);
        } else {
          console.error(response.msg);
        }
      });
    }
  }, [idUser, token, reset]);

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
            placeholder="Especializado en frontend"
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
            error={errors?.password?.message ?? ""}
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
