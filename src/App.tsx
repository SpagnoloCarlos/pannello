import { useNavigate } from "react-router";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/Home";
import { useEffect } from "react";

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? null : <HomePage />;
}

export default App;
