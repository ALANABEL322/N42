import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  role: z.literal("user"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const ADMIN_CODE = "ADMIN123";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [adminCode, setAdminCode] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    const result = await api.registerLocal({
      email: data.email,
      password: data.password,
      username: data.username,
      role: data.role,
    });

    if (result.success) {
      const loginResult = await api.login(data.email, data.password);

      if (loginResult.success) {
        navigate("/login");
      } else {
        setError("Error al iniciar sesión después del registro");
      }
    } else {
      setError(result.error || "Error al registrar el usuario");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F6EEEE] flex items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#DB6A00]">
          Registro de usuario
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
              type="email"
              {...register("email")}
              className="mt-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input id="username" {...register("username")} className="mt-2" />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="mt-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* <div>

            <Label htmlFor="role">Tipo de usuario</Label>
            <Select
              onValueChange={(value) => setValue("role", value as "user")}
              defaultValue="user"
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecciona el tipo de usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* <div>
            <Label htmlFor="adminCode">Código de administrador</Label>
            <Input
              id="adminCode"
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              className="mt-2"
            />
          </div> */}

          <Button
            type="submit"
            className="w-full bg-[#DB6A00] hover:bg-[#DB6A00]/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </Button>

          <div className="text-center mt-4">
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/login")}
              className="text-[#DB6A00]"
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
