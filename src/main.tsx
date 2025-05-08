import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/AccessControl/ProtectedRoutes.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Studies from "./pages/Studies.tsx";
import UserRoutes from "./components/AccessControl/UserRoutes.tsx";
import Addresses from "./pages/Addresses.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import Modal from "./components/Modal.tsx";
import Profile from "./pages/Profile.tsx";
import AdminRoutes from "./components/AccessControl/AdminRoutes.tsx";
import Users from "./pages/Users.tsx";
import User from "./pages/User.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route element={<UserRoutes />}>
              <Route path="addresses" element={<Addresses />} />
              <Route path="studies" element={<Studies />} />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="users" element={<Users />} />
              <Route path="user/:id" element={<User />} />
            </Route>
          </Route>
        </Routes>
        <Modal />
      </ModalProvider>
    </AuthProvider>
  </BrowserRouter>,
);
