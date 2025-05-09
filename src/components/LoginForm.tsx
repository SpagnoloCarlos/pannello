import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { loginSchema } from "../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import LoginIcon from "./Icons/LoginIcon";
import { useState, useTransition } from "react";

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
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [isPending, starTransition] = useTransition();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    starTransition(async () => {
      setError("");

      // Equivalente a
      /* 
        const response = await axios.post("https:example.com/api/login", {
          email: data.email,
          password: data.password
        });
      */
      const response = await login({ email: data.email, password: data.password });

      if (response.status === 0) {
        navigate("/dashboard");
      } else {
        setError(response.msg);
      }
    });
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
            placeholder="************"
            required
            error={errors?.password?.message ?? ""}
            disabled={isPending}
            {...field}
          />
        )}
      />
      <Button type="submit" className="mt-2" disabled={isPending}>
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
