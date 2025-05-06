import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Studies from "./pages/Studies.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="dashboard" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="addresses" element={<div>direccion</div>} />
          <Route path="studies" element={<Studies />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
);
