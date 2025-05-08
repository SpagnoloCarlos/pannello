import { createContext, useState, useContext, useEffect } from "react";
import { loginApi } from "../services/api";
import { getSessionValue, removeSessionValue, setSessionValue } from "../helpers/storageHelper";

interface User {
  role: "user" | "admin";
  firstName: string;
  lastName: string;
  email: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  role: "user" | "admin";
  isAuthenticated: boolean;
  login: (data: LoginProps) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
  setUser: (user: User) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface LoginResponse {
  status: number;
  msg: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const isBrowser = typeof window !== "undefined";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isBrowser) {
      const storedToken = getSessionValue("token");
      const storedUser = getSessionValue("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }: LoginProps): Promise<LoginResponse> => {
    try {
      const response = await loginApi({ email, password });

      if (response.status === 0 && response.token && response.user && isBrowser) {
        setSessionValue("token", response.token);
        setSessionValue("user", JSON.stringify(response.user));

        setToken(response.token);
        setUser(response.user);
        return { status: 0, msg: "ok" };
      }
      return { status: 1, msg: "Email o contraseña inválidos" };
    } catch {
      return { status: 1, msg: "Ocurrió un error en el login" };
    }
  };

  const logout = (): void => {
    if (isBrowser) {
      removeSessionValue("token");
      removeSessionValue("user");
    }
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;
  const role = user?.role || "user";

  const value: AuthContextType = {
    token,
    role,
    user,
    isAuthenticated,
    login,
    logout,
    loading,
    setUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
