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
    .min(4, "El año debe contener 4 dígitos")
    .max(4, "El año debe contener 4 dígitos"),
  description: string().min(1, "La descripción es requerida"),
});

export const AddressSchema = object({
  street: string().min(1, "La calle es requerida"),
  city: string().min(1, "La ciudad es requerida"),
  country: string().min(1, "El país es requerido"),
  zipCode: string().min(1, "El código postal es requerido"),
});
