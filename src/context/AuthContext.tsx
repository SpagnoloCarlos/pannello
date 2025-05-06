import { createContext, useState, useContext, useEffect } from "react";
import { loginApi } from "../services/api";

interface User {
  role: string;
  [key: string]: any;
}

interface LoginProps {
  email: string;
  password: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginProps) => Promise<LoginResponse>;
  logout: () => void;
  loading: boolean;
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
      const storedToken = sessionStorage.getItem("token");
      const storedUser = sessionStorage.getItem("user");

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

      if (response.token && isBrowser) {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("user", JSON.stringify(response.user));

        setToken(response.token);
        setUser(response.user);
        return { status: 0, msg: "ok" };
      }
      return { status: 1, msg: "Email o contraseña inválidos" };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error de servidor";

      return { status: 1, msg: errorMessage };
    }
  };

  const logout = (): void => {
    if (isBrowser) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
