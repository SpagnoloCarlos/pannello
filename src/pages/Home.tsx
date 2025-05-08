import LoginForm from "../components/LoginForm";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[100dvh] w-full max-w-7xl mx-auto px-4">
      <section className="flex flex-col items-center w-full gap-8">
        <h1 className="text-4xl font-bold">¡Bienvenido!</h1>
        <LoginForm />
      </section>
    </main>
  );
};

export default HomePage;
