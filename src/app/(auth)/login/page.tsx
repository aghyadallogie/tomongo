import AuthForm from "@/components/LoginForm";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 lg:p-24 max-w-2xl m-auto">
      <h1 className="font-bold text-2xl mb-10">Login</h1>
      <AuthForm />
    </main>
  );
}
