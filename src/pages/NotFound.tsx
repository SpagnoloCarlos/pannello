import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Página no encontrada</p>
      <Link
        to="/"
        className="px-4 py-2 rounded-md bg-emerald-900 hover:bg-emerald-900/80 text-white"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
