import { AuthProvider } from "../context/AuthContext";
import { ModalProvider } from "../context/ModalContext";
import { ToastProvider } from "../context/ToastContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <ToastProvider>{children}</ToastProvider>
      </ModalProvider>
    </AuthProvider>
  );
};

export default Providers;
