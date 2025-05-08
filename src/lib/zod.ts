import { object, string } from "zod";

export const loginSchema = object({
  email: string()
    .email({ message: "El email ingresado es inválido" })
    .min(1, "El email es requerido"),
  password: string().min(1, "La contraseña es requerida"),
});

export const studySchema = object({
  title: string().min(1, "El título es requerido"),
  institution: string().min(1, "La institución es requerida"),
  year: string()
    .min(1, "El año es requerido")
    .refine((val) => !isNaN(Number(val)), "Debe ser un número válido")
    .refine((val) => {
      const num = Number(val);
      return num >= 1000 && num <= 9999;
    }, "El año debe tener 4 dígitos")
    .refine((val) => Number(val) <= new Date().getFullYear(), "El año no puede ser mayor al actual")
    .refine((val) => Number.isInteger(Number(val)), "El año debe ser un número entero"),
  description: string().min(1, "La descripción es requerida"),
});

export const AddressSchema = object({
  street: string().min(1, "La calle es requerida"),
  city: string().min(1, "La ciudad es requerida"),
  country: string().min(1, "El país es requerido"),
  zipCode: string().min(1, "El código postal es requerido"),
});

export const userSchema = object({
  firstName: string().min(1, "El nombre es requerido"),
  lastName: string().min(1, "El apellido es requerido"),
  email: string()
    .email({ message: "El email ingresado es inválido" })
    .min(1, "El email es requerido"),
  password: string().min(1, "La contraseña es requerida"),
  role: string().refine((val) => val === "admin" || val === "user", {
    message: "El rol solo puede ser 'admin' o 'user'",
  }),
});
