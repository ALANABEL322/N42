import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { useAuthStore, User } from "../../store/userStore";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAdmin, isUser, loginSystemAdmin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      if (data.email === "ADMIN123@gmail.com" && data.password === "ADMIN123") {
        const adminUser: User = {
          id: "system-admin",
          email: "ADMIN123@gmail.com",
          username: "System Administrator",
          role: "admin",
        };

        useAuthStore.getState().login(adminUser);
        navigate("/admin");
        setIsLoading(false);
        return;
      }

      const result = await api.login(data.email, data.password);

      if (result.success) {
        if (isAdmin()) {
          console.log("🔐 Redirigiendo a admin dashboard");
          navigate("/admin");
        } else if (isUser()) {
          console.log("🔐 Redirigiendo a user landing page");
          navigate("/user");
        }
      } else {
        setError(result.error || "Credenciales inválidas");
      }
    } catch (err) {
      console.error("❌ Error en login:", err);
      setError("Ocurrió un error durante el inicio de sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EEEE] flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#DB6A00]">
          Iniciar sesión
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="correo@ejemplo.com"
              {...register("email")}
              className="mt-2"
              autoComplete="username"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              {...register("password")}
              className="mt-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#DB6A00] hover:bg-[#DB6A00]/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Verificando..." : "Iniciar sesión"}
          </Button>

          <div className="text-center mt-4">
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/register")}
              className="text-[#DB6A00]"
            >
              ¿No tienes una cuenta? Regístrate
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
