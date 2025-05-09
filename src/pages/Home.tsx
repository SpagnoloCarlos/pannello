import LoginForm from "../components/LoginForm";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Login | Pannello";
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-[100dvh] w-full max-w-7xl mx-auto px-4">
      <section className="flex flex-col items-center w-full gap-8 mb-16">
        <h1 className="text-4xl font-bold uppercase">Panello</h1>
        <LoginForm />
      </section>
      <p className="absolute bottom-4">
        Desarrollado por{" "}
        <a
          href="https://spagnolo-carlos.netlify.app/"
          target="_blank"
          className="text-green-600 text-center underline-offset-2 hover:underline cursor-pointer"
        >
          Carlos Andrés Spagnolo
        </a>
      </p>
    </main>
  );
};

export default HomePage;
