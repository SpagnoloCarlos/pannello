import { object, string } from "zod";

export const loginSchema = object({
  email: string()
    .email({ message: "El email ingresado es inválido" })
    .min(1, "El email es requerido"),
  password: string().min(1, "La contraseña es requerida"),
});
