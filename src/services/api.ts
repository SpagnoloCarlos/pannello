// Simulación de API con datos mock

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface Study {
  id: number;
  userId: number;
  title: string;
  institution: string;
  year: string;
  description: string;
}

export interface Address {
  id: number;
  userId: number;
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

interface LoginProps {
  email: string;
  password: string;
}

type UserWithoutPassword = Omit<User, "password">;
type UserCreate = Omit<User, "id">;
type StudyCreate = Omit<Study, "id" | "userId">;
type AddressCreate = Omit<Address, "id" | "userId">;

// Usuarios
const users: User[] = [
  {
    id: 1,
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    firstName: "Carlos",
    lastName: "Spagnolo",
    email: "carlos@example.com",
    password: "carlos123",
    role: "user",
  },
  {
    id: 3,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "john123",
    role: "user",
  },
  {
    id: 4,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "jane123",
    role: "user",
  },
];

// Estudios
const studies: Study[] = [
  {
    id: 1,
    userId: 1,
    title: "Ingeniería Informática",
    institution: "Universidad Tecnológica",
    year: "2018",
    description: "Especialización en desarrollo web",
  },
  {
    id: 2,
    userId: 2,
    title: "Diseño Gráfico",
    institution: "Instituto de Artes",
    year: "2019",
    description: "Enfoque en UI/UX",
  },
  {
    id: 3,
    userId: 2,
    title: "Marketing Digital",
    institution: "Universidad de Negocios",
    year: "2020",
    description: "Especialización en redes sociales",
  },
  {
    id: 4,
    userId: 2,
    title: "Gestión de Proyectos",
    institution: "Instituto de Management",
    year: "2021",
    description: "Certificación PMP",
  },
  {
    id: 5,
    userId: 2,
    title: "Desarrollo Full Stack",
    institution: "Academia de Código",
    year: "2019",
    description: "MERN Stack",
  },
  {
    id: 6,
    userId: 3,
    title: "Marketing Digital",
    institution: "Universidad de Negocios",
    year: "2020",
    description: "Especialización en redes sociales",
  },
  {
    id: 7,
    userId: 3,
    title: "Gestión de Proyectos",
    institution: "Instituto de Management",
    year: "2021",
    description: "Certificación PMP",
  },
  {
    id: 8,
    userId: 4,
    title: "Desarrollo Full Stack",
    institution: "Academia de Código",
    year: "2019",
    description: "MERN Stack",
  },
  {
    id: 9,
    userId: 4,
    title: "Data Science",
    institution: "Instituto de Tecnología",
    year: "2020",
    description: "Machine Learning y análisis de datos",
  },
  {
    id: 10,
    userId: 4,
    title: "Cloud Computing",
    institution: "Tech Academy",
    year: "2021",
    description: "AWS y Azure",
  },
];

// Direcciones
const addresses: Address[] = [
  {
    id: 1,
    userId: 1,
    street: "Calle Principal 123",
    city: "Ciudad Capital",
    zipCode: "12345",
    country: "Argentina",
  },
  {
    id: 2,
    userId: 2,
    street: "Avenida Central 456",
    city: "Ciudad Norte",
    zipCode: "54321",
    country: "Argentina",
  },
  {
    id: 3,
    userId: 2,
    street: "Boulevard Sur 789",
    city: "Ciudad Sur",
    zipCode: "67890",
    country: "Uruguay",
  },
  {
    id: 4,
    userId: 3,
    street: "Calle Comercial 234",
    city: "Ciudad Este",
    zipCode: "34567",
    country: "Uruguay",
  },
  {
    id: 5,
    userId: 3,
    street: "Avenida Libertad 567",
    city: "Ciudad Oeste",
    zipCode: "89012",
    country: "Argentina",
  },
  {
    id: 6,
    userId: 3,
    street: "Paseo del Sol 890",
    city: "Ciudad Centro",
    zipCode: "23456",
    country: "México",
  },
  {
    id: 7,
    userId: 4,
    street: "Calle del Parque 345",
    city: "Ciudad Nueva",
    zipCode: "78901",
    country: "Colombia",
  },
  {
    id: 8,
    userId: 4,
    street: "Avenida Principal 678",
    city: "Ciudad Vieja",
    zipCode: "45678",
    country: "Argentina",
  },
];

// Función para simular delay de red
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Autenticación
export const loginApi = async ({
  email,
  password,
}: LoginProps): Promise<{ token: string; user: UserWithoutPassword }> => {
  await delay();

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Email o contraseña inválidos");
  }

  // Crear un token simulado que incluye el ID y rol del usuario
  const token = btoa(JSON.stringify({ id: user.id, role: user.role }));

  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
};

// Usuarios
export const fetchUsers = async (): Promise<UserWithoutPassword[]> => {
  await delay();
  return users.map(({ password, ...user }) => user);
};

export const fetchUserById = async (userId: string): Promise<UserWithoutPassword> => {
  await delay();
  const user = users.find((u) => u.id === Number.parseInt(userId));

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const createUser = async (userData: UserCreate): Promise<UserWithoutPassword> => {
  await delay();

  if (users.some((u) => u.email === userData.email)) {
    throw new Error("El email ya está en uso");
  }

  const newUser: User = {
    ...userData,
    id: users.length + 1,
  };

  users.push(newUser);

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const updateUser = async (
  userId: string,
  userData: Partial<UserCreate>,
): Promise<UserWithoutPassword> => {
  await delay();

  const index = users.findIndex((u) => u.id === Number.parseInt(userId));

  if (index === -1) {
    throw new Error("Usuario no encontrado");
  }

  if (userData.email !== users[index].email && users.some((u) => u.email === userData.email)) {
    throw new Error("El email ya está en uso");
  }

  // Mantener la contraseña si no se proporciona una nueva
  const updatedUser: User = {
    ...users[index],
    ...userData,
    id: Number.parseInt(userId),
  };

  users[index] = updatedUser;

  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

// Estudios
export const fetchUserStudies = async (token: string): Promise<Study[]> => {
  await delay();
  const { id: userId } = JSON.parse(atob(token));
  return studies.filter((s) => s.userId === userId);
};

export const createStudy = async (userId: string, studyData: StudyCreate): Promise<Study> => {
  await delay();

  const newStudy: Study = {
    ...studyData,
    id: studies.length + 1,
    userId: Number.parseInt(userId),
  };

  studies.push(newStudy);
  return newStudy;
};

export const deleteStudy = async (studyId: string): Promise<{ success: boolean }> => {
  await delay();

  const index = studies.findIndex((s) => s.id === Number.parseInt(studyId));

  if (index === -1) {
    throw new Error("Estudio no encontrado");
  }

  studies.splice(index, 1);
  return { success: true };
};

// Direcciones
export const fetchUserAddresses = async (token: string): Promise<Address[]> => {
  await delay();
  const { id: userId } = JSON.parse(atob(token));

  return addresses.filter((a) => a.userId === Number.parseInt(userId));
};

export const createAddress = async (
  userId: string,
  addressData: AddressCreate,
): Promise<Address> => {
  await delay();

  const newAddress: Address = {
    ...addressData,
    id: addresses.length + 1,
    userId: Number.parseInt(userId),
  };

  addresses.push(newAddress);
  return newAddress;
};

export const deleteAddress = async (addressId: string): Promise<{ success: boolean }> => {
  await delay();

  const index = addresses.findIndex((a) => a.id === Number.parseInt(addressId));

  if (index === -1) {
    throw new Error("Dirección no encontrada");
  }

  addresses.splice(index, 1);
  return { success: true };
};
