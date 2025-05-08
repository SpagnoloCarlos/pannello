import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { loginSchema } from "../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import LoginIcon from "./Icons/LoginIcon";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  let navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    setError("");
    const response = await login({ email: data.email, password: data.password });

    if (response.status === 0) {
      navigate("/dashboard");
    } else {
      setError(response.msg);
    }

    setLoading(false);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-lg gap-4 px-6 py-8 border border-gray-400 rounded-md"
    >
      <h2 className="text-xl">Ingresar</h2>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            type="email"
            id="email"
            label="Email"
            placeholder="carlos.example@mail.com"
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
            placeholder="************"
            required
            error={errors?.password?.message ?? ""}
            {...field}
          />
        )}
      />
      <Button type="submit" className="mt-2" disabled={loading}>
        <div className="flex items-center gap-2">
          Iniciar sesión
          <LoginIcon />
        </div>
      </Button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </form>
  );
};

export default LoginForm;
