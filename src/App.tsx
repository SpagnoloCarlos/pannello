import { useNavigate } from "react-router";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/Home";
import { useEffect } from "react";

function App() {
  const { isAuthenticated } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? null : <HomePage />;
}

export default App;
