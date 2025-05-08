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

interface ResponseLogin extends Response {
  user?: UserWithoutPassword;
  token?: string;
}

interface ResponseAllStudies extends Response {
  studies?: Study[];
}

interface ResponseCreatedStudy extends Response {
  study?: Study;
}

interface ResponseAllAddresses extends Response {
  addresses?: Address[];
}

interface ResponseCreatedAddress extends Response {
  address?: Address;
}

export type UserWithoutPassword = Omit<User, "password">;
type UserCreate = Omit<User, "id">;
type StudyCreate = Omit<Study, "id" | "userId">;
type AddressCreate = Omit<Address, "id" | "userId">;

interface ResponseGetAllUsers extends Response {
  users?: UserWithoutPassword[];
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
    role: "admin",
  },
];

// Contador global para IDs de usuario
let userIdCounter = users.reduce((max, user) => Math.max(max, user.id), 0) + 1;

// Estudios
const studies: Study[] = [
  {
    id: 1,
    userId: 4,
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
    userId: 4,
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
export const loginApi = async ({ email, password }: LoginProps): Promise<ResponseLogin> => {
  try {
    await delay();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      const res: ResponseLogin = {
        status: 1,
        msg: "Email o contraseña inválidos",
      };
      return res;
    }

    // Crear un token simulado que incluye el ID y rol del usuario
    const token = btoa(JSON.stringify({ id: user.id, role: user.role }));

    const { password: _, ...userWithoutPassword } = user;

    const res: ResponseLogin = {
      status: 0,
      msg: "ok",
      token,
      user: userWithoutPassword,
    };

    return res;
  } catch {
    const res: ResponseLogin = {
      status: 1,
      msg: "Ocurrió un error en el login",
    };
    return res;
  }
};

// Usuarios
export const fetchUsers = async (token: string): Promise<ResponseGetAllUsers> => {
  try {
    await delay();
    const { role, id } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const allUsers = users?.filter((u) => u.id !== id)?.map(({ password, ...user }) => user);

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
        msg: "Usuario no encontrado",
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
      id: userIdCounter++,
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
  userData: Partial<UserCreate>,
): Promise<ResponseCreatedUser> => {
  try {
    await delay();
    const { id: userId } = JSON.parse(atob(token));

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

export const updateUserByAdmin = async (
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

export const deleteUser = async (token: string, userId: number): Promise<Response> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      return {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };
    }

    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      return {
        status: 1,
        msg: "Usuario no encontrado",
      };
    }

    users.splice(index, 1);

    return {
      status: 0,
      msg: "Usuario eliminado con éxito",
    };
  } catch {
    return {
      status: 1,
      msg: "Ocurrió un error al eliminar el usuario",
    };
  }
};

// Estudios
export const fetchUserStudies = async (token: string): Promise<ResponseAllStudies> => {
  try {
    await delay();
    const { id: userId } = JSON.parse(atob(token));
    const userStudies = studies.filter((s) => s.userId === userId);

    const res: ResponseAllStudies = {
      status: 0,
      msg: "ok",
      studies: userStudies,
    };
    return res;
  } catch {
    const res: ResponseAllStudies = {
      status: 1,
      msg: "Ocurrió un error al obtener los estudios",
    };
    return res;
  }
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
        msg: "Estudio no encontrado",
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
    };

    return res;
  }
};

export const fetchUserStudyByIdByAdmin = async (
  token: string,
  userId: number,
  id: number,
): Promise<ResponseCreatedStudy> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }
    const study = studies.find((s) => s.userId === userId && s.id === id);

    if (!study) {
      const res: ResponseCreatedStudy = {
        status: 1,
        msg: "Estudio no encontrado",
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
      msg: "Ocurrió un error al crear el estudio",
    };
    return res;
  }
};

export const createStudyByAdmin = async (
  token: string,
  userId: number,
  studyData: StudyCreate,
): Promise<ResponseCreatedStudy> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const newStudy: Study = {
      ...studyData,
      id: studies.length + 1,
      userId: userId,
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
    };
  }
};

export const updateStudyByAdmin = async (
  token: string,
  userId: number,
  studyId: number,
  studyData: Partial<StudyCreate>,
): Promise<ResponseCreatedStudy> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const index = studies.findIndex((s) => s.id === studyId && s.userId === userId);

    if (index === -1) {
      return {
        status: 1,
        msg: "Estudio no encontrado",
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
    };
  }
};

export const deleteStudy = async (token: string, studyId: number): Promise<Response> => {
  try {
    await delay();
    const { id } = JSON.parse(atob(token));

    const index = studies.findIndex((s) => s.userId === id && s.id === studyId);

    if (index === -1) {
      const res: Response = {
        status: 1,
        msg: "Estudio no encontrado",
      };
      return res;
    }

    studies.splice(index, 1);

    const res: Response = {
      status: 0,
      msg: "Estudio eliminado con éxito",
    };
    return res;
  } catch {
    const res: Response = {
      status: 1,
      msg: "Ocurrió un error al eliminar el estudio",
    };
    return res;
  }
};

export const deleteStudyByAdmin = async (
  token: string,
  userId: number,
  studyId: number,
): Promise<Response> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const index = studies.findIndex((s) => s.userId === userId && s.id === studyId);

    if (index === -1) {
      const res: Response = {
        status: 1,
        msg: "Estudio no encontrado",
      };
      return res;
    }

    studies.splice(index, 1);

    const res: Response = {
      status: 0,
      msg: "Estudio eliminado con éxito",
    };
    return res;
  } catch {
    const res: Response = {
      status: 1,
      msg: "Ocurrió un error al eliminar el estudio",
    };
    return res;
  }
};

// Direcciones
export const fetchUserAddresses = async (token: string): Promise<ResponseAllAddresses> => {
  try {
    await delay();
    const { id: userId } = JSON.parse(atob(token));
    const userAddresses = addresses.filter((a) => a.userId === Number.parseInt(userId));
    const res: ResponseAllAddresses = {
      status: 0,
      msg: "ok",
      addresses: userAddresses,
    };

    return res;
  } catch {
    const res: ResponseAllAddresses = {
      status: 1,
      msg: "Ocurrió un error al obtener las direcciones",
    };

    return res;
  }
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
      const res: ResponseCreatedAddress = {
        status: 1,
        msg: "Dirección no encontrada",
      };
      return res;
    }

    const res: ResponseCreatedAddress = {
      status: 0,
      msg: "ok",
      address,
    };

    return res;
  } catch {
    const res: ResponseCreatedAddress = {
      status: 1,
      msg: "Ocurrió un error al obtener la dirección",
    };
    return res;
  }
};

export const fetchUserAddressByIdByAdmin = async (
  token: string,
  userId: number,
  id: number,
): Promise<ResponseCreatedAddress> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const address = addresses.find((a) => a.userId === userId && a.id === id);

    if (!address) {
      const res: ResponseCreatedAddress = {
        status: 1,
        msg: "Dirección no encontrada",
      };
      return res;
    }

    const res: ResponseCreatedAddress = {
      status: 0,
      msg: "ok",
      address,
    };

    return res;
  } catch {
    const res: ResponseCreatedAddress = {
      status: 1,
      msg: "Ocurrió un error al obtener la dirección",
    };
    return res;
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
    };
    return res;
  }
};

export const createAddressByAdmin = async (
  token: string,
  userId: number,
  addressData: AddressCreate,
): Promise<ResponseCreatedAddress> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const newAddress: Address = {
      ...addressData,
      id: addresses.length + 1,
      userId: userId,
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
    };
  }
};

export const updateAddressByAdmin = async (
  token: string,
  userId: number,
  addressId: number,
  addressData: Partial<AddressCreate>,
): Promise<ResponseCreatedAddress> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const index = addresses.findIndex((a) => a.id === addressId && a.userId === userId);

    if (index === -1) {
      return {
        status: 1,
        msg: "Dirección no encontrada",
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
    };
  }
};

export const deleteAddress = async (token: string, addressId: number): Promise<Response> => {
  try {
    await delay();
    const { id } = JSON.parse(atob(token));
    const index = addresses.findIndex((a) => a.userId === id && a.id === addressId);

    if (index === -1) {
      const res: Response = {
        status: 1,
        msg: "Dirección no encontrada",
      };
      return res;
    }

    addresses.splice(index, 1);

    const res: Response = {
      status: 0,
      msg: "Dirección eliminada con éxito",
    };
    return res;
  } catch {
    const res: Response = {
      status: 1,
      msg: "Ocurrió un error al eliminar la dirección",
    };
    return res;
  }
};

export const deleteAddressByAdmin = async (
  token: string,
  userId: number,
  addressId: number,
): Promise<Response> => {
  try {
    await delay();
    const { role } = JSON.parse(atob(token));

    if (role !== "admin") {
      const res: ResponseGetAllUsers = {
        status: 1,
        msg: "No tiene los permisos necesarios para realizar esta acción",
      };

      return res;
    }

    const index = addresses.findIndex((a) => a.userId === userId && a.id === addressId);

    if (index === -1) {
      const res: Response = {
        status: 1,
        msg: "Dirección no encontrada",
      };
      return res;
    }

    addresses.splice(index, 1);

    const res: Response = {
      status: 0,
      msg: "Dirección eliminada con éxito",
    };
    return res;
  } catch {
    const res: Response = {
      status: 1,
      msg: "Ocurrió un error al eliminar la dirección",
    };
    return res;
  }
};
