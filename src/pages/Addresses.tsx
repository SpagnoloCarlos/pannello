import { useAuth } from "../context/AuthContext";

const Address = () => {
  const { user } = useAuth();

  return (
    <section className="w-full max-w-5xl px-6 py-8">
      {user?.role === "admin" ? <>direcciones admin</> : <>direcciones user</>}
    </section>
  );
};

export default Address;
