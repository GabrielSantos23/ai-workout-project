import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full  flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
