import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  position?: "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight";
}

interface ToastContextProps {
  showToast: (toast: Omit<ToastMessage, "id">) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((currentToasts) => [...currentToasts, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </ToastContext.Provider>
  );
};
