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

interface Response {
  status: number;
  msg: string;
}

interface ResponseCreatedStudy extends Response {
  study: Study;
}

interface ResponseCreatedAddress extends Response {
  address: Address;
}

export type UserWithoutPassword = Omit<User, "password">;
type UserCreate = Omit<User, "id">;
type StudyCreate = Omit<Study, "id" | "userId">;
type AddressCreate = Omit<Address, "id" | "userId">;

interface ResponseGetAllUsers extends Response {
  users: UserWithoutPassword[];
}

interface ResponseCreatedUser extends Response {
  user?: UserWithoutPassword;
}

interface userWithStudiesAndAddresses extends UserWithoutPassword {
  studies: Study[];
  addresses: Address[];
}

interface ResponseFindUser extends Response {
  user?: userWithStudiesAndAddresses;
}

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
export const fetchUsers = async (token: string): Promise<ResponseGetAllUsers> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));
    const allUsers = users.map(({ password, ...user }) => user);

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
        users: [],
      };

      return res;
    }

    const res: ResponseGetAllUsers = {
      status: 0,
      msg: "ok",
      users: allUsers,
    };

    return res;
  } catch {
    const res: ResponseGetAllUsers = {
      status: 1,
      msg: "Ocurrió un error al obtener los usuarios",
      users: [],
    };

    return res;
  }
};

export const fetchUserById = async (token: string, userId: number): Promise<ResponseFindUser> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseFindUser = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      const res: ResponseFindUser = {
        status: 1,
        msg: "El usuario no existe",
      };
      return res;
    }

    const userStudies = studies?.filter((s) => s.userId === userId);
    const userAddresses = addresses?.filter((a) => a.userId === userId);

    const res: ResponseFindUser = {
      status: 0,
      msg: "ok",
      user: {
        ...user,
        studies: userStudies,
        addresses: userAddresses,
      },
    };

    return res;
  } catch {
    const res: ResponseFindUser = {
      status: 1,
      msg: "Ocurrió un error al obtener el usuario",
    };

    return res;
  }
};

export const createUser = async (
  token: string,
  userData: UserCreate,
): Promise<ResponseCreatedUser> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseCreatedUser = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    if (users.some((u) => u.email === userData.email)) {
      const res: ResponseCreatedUser = {
        status: 1,
        msg: "El email ingresado ya está en uso",
      };

      return res;
    }

    const newUser: User = {
      ...userData,
      id: users.length + 1,
    };

    users.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    const res: ResponseCreatedUser = {
      status: 0,
      msg: "ok",
      user: userWithoutPassword,
    };

    return res;
  } catch {
    const res: ResponseCreatedUser = {
      status: 1,
      msg: "Ocurrió un error al crear el usuario",
    };

    return res;
  }
};

export const updateUser = async (
  token: string,
  userId: number,
  userData: Partial<UserCreate>,
): Promise<ResponseCreatedUser> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseCreatedUser = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      const res: ResponseCreatedUser = {
        status: 1,
        msg: "Usuario no encontrado",
      };

      return res;
    }

    if (userData.email !== users[index].email && users.some((u) => u.email === userData.email)) {
      const res: ResponseCreatedUser = {
        status: 1,
        msg: "El email ingresado ya está en uso",
      };

      return res;
    }

    const updatedUser: User = {
      ...users[index],
      ...userData,
      id: userId,
    };

    users[index] = updatedUser;

    const { password, ...userWithoutPassword } = updatedUser;
    const res: ResponseCreatedUser = {
      status: 0,
      msg: "ok",
      user: userWithoutPassword,
    };

    return res;
  } catch {
    const res: ResponseCreatedUser = {
      status: 1,
      msg: "Ocurrió un error al actualizar el usuario",
    };

    return res;
  }
};

// Estudios
export const fetchUserStudies = async (token: string): Promise<Study[]> => {
  await delay();
  const { id: userId } = JSON.parse(atob(token));
  const userStudies = studies.filter((s) => s.userId === userId);

  return userStudies;
};

export const fetchUserStudyById = async (
  token: string,
  id: number,
): Promise<ResponseCreatedStudy> => {
  try {
    await delay();
    const { id: userId } = JSON.parse(atob(token));
    const study = studies.find((s) => s.userId === userId && s.id === id);

    if (!study) {
      const res: ResponseCreatedStudy = {
        status: 1,
        msg: "El estudio no existe",
        study: {
          id: 0,
          userId: 0,
          title: "",
          institution: "",
          year: "",
          description: "",
        },
      };
      return res;
    }

    const res: ResponseCreatedStudy = {
      status: 0,
      msg: "ok",
      study,
    };

    return res;
  } catch {
    const res: ResponseCreatedStudy = {
      status: 1,
      msg: "Ocurrió un error al obtener el estudio",
      study: {
        id: 0,
        userId: 0,
        title: "",
        institution: "",
        year: "",
        description: "",
      },
    };

    return res;
  }
};

export const createStudy = async (
  token: string,
  studyData: StudyCreate,
): Promise<ResponseCreatedStudy> => {
  try {
    await delay();
    const { id: userId } = JSON.parse(atob(token));

    const newStudy: Study = {
      ...studyData,
      id: studies.length + 1,
      userId: Number.parseInt(userId),
    };

    studies.push(newStudy);

    const res: ResponseCreatedStudy = {
      status: 0,
      study: newStudy,
      msg: "ok",
    };
    return res;
  } catch {
    const res: ResponseCreatedStudy = {
      status: 1,
      study: {
        id: 0,
        userId: 0,
        title: "",
        institution: "",
        year: "",
        description: "",
      },
      msg: "Ocurrió un error al crear el estudio",
    };
    return res;
  }
};

export const updateStudy = async (
  token: string,
  studyId: number,
  studyData: Partial<StudyCreate>,
): Promise<ResponseCreatedStudy> => {
  try {
    await delay();
    const { id: userId } = JSON.parse(atob(token));
    const index = studies.findIndex((s) => s.id === studyId && s.userId === userId);

    if (index === -1) {
      return {
        status: 1,
        msg: "Estudio no encontrado",
        study: {
          id: 0,
          userId: 0,
          title: "",
          institution: "",
          year: "",
          description: "",
        },
      };
    }

    const updatedStudy: Study = {
      ...studies[index],
      ...studyData,
    };

    studies[index] = updatedStudy;

    return {
      status: 0,
      msg: "ok",
      study: updatedStudy,
    };
  } catch {
    return {
      status: 1,
      msg: "Ocurrió un error al actualizar el estudio",
      study: {
        id: 0,
        userId: 0,
        title: "",
        institution: "",
        year: "",
        description: "",
      },
    };
  }
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

export const fetchUserAddressById = async (
  token: string,
  id: number,
): Promise<ResponseCreatedAddress> => {
  try {
    await delay();
    const { id: userId } = JSON.parse(atob(token));
    const address = addresses.find((a) => a.userId === userId && a.id === id);

    if (!address) {
      return {
        status: 1,
        msg: "La dirección no existe",
        address: {
          id: 0,
          userId: 0,
          street: "",
          city: "",
          zipCode: "",
          country: "",
        },
      };
    }

    return {
      status: 0,
      msg: "ok",
      address,
    };
  } catch {
    return {
      status: 1,
      msg: "Ocurrió un error al obtener la dirección",
      address: {
        id: 0,
        userId: 0,
        street: "",
        city: "",
        zipCode: "",
        country: "",
      },
    };
  }
};

export const createAddress = async (
  token: string,
  addressData: AddressCreate,
): Promise<ResponseCreatedAddress> => {
  try {
    await delay();
    const { id: userId } = JSON.parse(atob(token));

    const newAddress: Address = {
      ...addressData,
      id: addresses.length + 1,
      userId: Number.parseInt(userId),
    };

    addresses.push(newAddress);

    const res: ResponseCreatedAddress = {
      status: 0,
      msg: "ok",
      address: newAddress,
    };

    return res;
  } catch {
    const res: ResponseCreatedAddress = {
      status: 1,
      msg: "Ocurrió un error al crear la dirección",
      address: {
        id: 0,
        userId: 0,
        street: "",
        city: "",
        country: "",
        zipCode: "",
      },
    };
    return res;
  }
};

export const updateAddress = async (
  token: string,
  addressId: number,
  addressData: Partial<AddressCreate>,
): Promise<ResponseCreatedAddress> => {
  try {
    await delay();
    const { id: userId } = JSON.parse(atob(token));
    const index = addresses.findIndex((a) => a.id === addressId && a.userId === userId);

    if (index === -1) {
      return {
        status: 1,
        msg: "Dirección no encontrada",
        address: {
          id: 0,
          userId: 0,
          street: "",
          city: "",
          zipCode: "",
          country: "",
        },
      };
    }

    const updatedAddress: Address = {
      ...addresses[index],
      ...addressData,
    };

    addresses[index] = updatedAddress;

    return {
      status: 0,
      msg: "ok",
      address: updatedAddress,
    };
  } catch {
    return {
      status: 1,
      msg: "Ocurrió un error al actualizar la dirección",
      address: {
        id: 0,
        userId: 0,
        street: "",
        city: "",
        zipCode: "",
        country: "",
      },
    };
  }
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
